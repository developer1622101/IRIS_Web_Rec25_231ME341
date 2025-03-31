import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export const bookWithEditionController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.query.id as string

    if (!id || Number.isNaN(parseInt(id))) {
      return res.status(400).json({ msg: 'missing / invalid fields.' })
    }

    const book = await prisma.bookWithEdition.findUnique({
      where: { id: parseInt(id) },
      include: {
        cover: { select: { coverId: true } },
        author: { select: { name: true, id: true } },

        publisher: { select: { name: true } }
      }
    })
    return res.status(200).json({ book })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ msg: 'internal server error' })
  } finally {
    ;async () => await prisma.$disconnect()
  }
}
