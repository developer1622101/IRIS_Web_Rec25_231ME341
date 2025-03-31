import { PrismaClient } from '@prisma/client'
import { Response, Request } from 'express'

const prisma = new PrismaClient()

export const publicBooksController = async (req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany({
      where: {
        bookStatus: 'Public'
      },
      select: {
        id: true,
        bookId: true,
        title: true,
        availableCount: true,
        cover: {
          select: {
            coverId: true
          }
        }
      }
    })

    res.status(200).json({ success: true, books })
  } catch (e) {
    console.log(e)

    res.status(500).json({ success: false, msg: 'internal server error' })
  } finally {
    ;async () => {
      await prisma.$disconnect()
    }
  }
}
