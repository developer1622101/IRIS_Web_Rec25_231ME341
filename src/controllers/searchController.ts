import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export const searchController = async (req: Request, res: Response) => {
  const mode = req.query.mode

  const q = req.query.q as string

  if (
    !mode ||
    !q ||
    !(mode === 'book' || mode === 'author' || mode === 'publication')
  ) {
    return res
      .status(401)
      .json({ msg: 'Missing/invalid required  query parameters' })
  }

  let searchResults

  try {
    switch (mode) {
      case 'book':
        searchResults = await prisma.book.findMany({
          where: {
            title: { contains: q },
            bookStatus: 'Public'
          },
          select: {
            title: true,
            id: true,
            bookId: true,
            cover: { select: { coverId: true } }
          }
        })
        return res.status(200).json({ searchResults })
      case 'author':
        searchResults = await prisma.author.findMany({
          where: { name: { contains: q } },
          select: { name: true, id: true }
        })
        return res.status(200).json({ searchResults })

      case 'publication':
        searchResults = await prisma.publisher.findMany({
          where: { name: { contains: q } },
          select: { name: true, id: true }
        })
        return res.status(200).json({ searchResults })
    }
  } catch (e) {
    console.log(e)
    return res.status(500).json({ msg: 'Internal server error.' })
  } finally {
    ;async () => await prisma.$disconnect()
  }
}
