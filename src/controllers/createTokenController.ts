import { PrismaClient } from '@prisma/client'
import { Response, Request } from 'express'

export const createTokenController = async (req: Request, res: Response) => {
  if (!req.role) {
    res.status(401).json({ msg: 'You are not authorised to borrow books.' })
  }

  const { id, duration } = req.body // the id we get is the id of an entry in bookWithEdition.

  const prisma = new PrismaClient()

  try {
    if (
      req.userId &&
      id &&
      duration &&
      typeof id === 'string' &&
      !Number.isNaN(parseInt(id)) &&
      typeof duration === 'number'
    ) {
      const currentDate = new Date()

      const dueDate = new Date(
        currentDate.setDate(currentDate.getDate() + duration - 1)
      )

      dueDate.setHours(23, 59, 0, 0)

      await prisma.$transaction([
        prisma.token.create({
          data: {
            duration: duration * 60 * 60 * 1000,
            borrowerId: req.userId,
            dueDate,
            books: { connect: { id: parseInt(id) } }
          }
        }),
        prisma.bookWithEdition.update({
          where: { id: parseInt(id) },
          data: {
            availableCount: {
              decrement: 1
            }
          }
        })
      ])

      const book = await prisma.book.findUnique({
        where: { id: parseInt(id) }
      })

      if (book) {
        await prisma.book.update({
          where: { id: parseInt(id) },
          data: { availableCount: { decrement: 1 } }
        })
      }

      return res.status(201).json({ msg: 'token created successfully.' })
    } else {
      return res.status(400).json({ msg: 'missing/invalid fields.' })
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({ msg: 'internal server error.' })
  } finally {
    ;async () => {
      await prisma.$disconnect()
    }
  }
}
