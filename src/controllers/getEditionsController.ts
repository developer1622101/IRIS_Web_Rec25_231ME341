import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export const getEditionsController = async (req: Request, res: Response) => {
  const bookId = req.query.bookId as string

  console.log(parseInt(bookId))
  console.log(typeof parseInt(bookId))

  console.log(Number.isNaN(parseInt(bookId)))

  if (!bookId || Number.isNaN(parseInt(bookId))) {
    return res.status(400).json({ msg: 'Invalid/missing fields' })
  }

  try {
    const editions = await prisma.bookWithEdition.findMany({
      where: { bookId: parseInt(bookId) },

      include: {
        cover: { select: { coverId: true } },
        author: { select: { name: true, id: true } },
        publisher: { select: { name: true, id: true } }
      }
    })
    return res.status(200).json({ editions })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ msg: 'internal server error' })
  } finally {
    ;async () => {
      await prisma.$disconnect()
    }
  }
}
