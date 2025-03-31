import { PrismaClient, Role, Status } from '@prisma/client'
import { Response, Request, Router } from 'express'

export const studentApplicationRoutes = Router()

const prisma = new PrismaClient()

studentApplicationRoutes.get('', async (req: Request, res: Response) => {
  try {
    const applications = await prisma.application.findMany({
      where: {
        roleRequested: Role.Student,
        status: Status.Pending
      },
      select: {
        userId: true,
        User: {
          select: { email: true, Profile: { omit: { userId: true } } }
        },
        id: true
      }
    })

    res.status(200).json({ applications })
    return
  } catch (e) {
    console.log(e)
    res.status(500).json({ msg: 'internal server error' })
    return
  } finally {
    ;async () => {
      await prisma.$disconnect()
    }
  }
})

studentApplicationRoutes.put('', async (req: Request, res: Response) => {
  const { id, status } = req.body

  if (
    id &&
    typeof id === 'number' &&
    status &&
    typeof status === 'number' &&
    (status === 1 || status === 0)
  ) {
    const enumStatus = status === 0 ? Status.Declined : Status.Accepted

    if (enumStatus === Status.Declined) {
      try {
        await prisma.application.update({
          where: {
            id
          },
          data: {
            status: enumStatus
          } // just update the status  , dont update the role of the user .
        })

        res.status(200).json({ msg: 'application declined.' })
        return
      } catch (e) {
        console.log(e)
        res.status(500).json({ msg: 'internal server error' })
        return
      } finally {
        ;async () => {
          await prisma.$disconnect()
        }
      }
    } else {
      try {
        await prisma.application.update({
          where: {
            id
          },
          data: {
            status: enumStatus,
            User: {
              update: {
                role: Role.Student
              }
            }
          } // update status of application and also update the role of the user to Student.
        })

        res.status(200).json({ msg: 'application approved.' })
        return
      } catch (e) {
        console.log(e)
        res.status(500).json({ msg: 'internal server error' })
        return
      } finally {
        ;async () => {
          await prisma.$disconnect()
        }
      }
    }
  } else {
    res.status(400).json({ msg: 'Invalid/missing fields.' })
    return
  }
})

// batch update option  should also be provided.
