import { PrismaClient, Role, Status } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export const getStudentApplications = async (req: Request, res: Response) => {
  const role = req.role

  if (role === null || role === Role.Student) {
    return res.status(401).json({ msg: 'Unauthorised access.' })
  }

  try {
    await prisma.application.findMany({
      where: {
        roleRequested: Role.Student,
        status: Status.Pending
      },
      select: {
        userId: true,
        User: {
          select: { email: true, Profile: { omit: { userId: true } } }
        }
      }
    })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ msg: 'internal server error' })
  } finally {
    ;async () => {
      await prisma.$disconnect()
    }
  }
}
