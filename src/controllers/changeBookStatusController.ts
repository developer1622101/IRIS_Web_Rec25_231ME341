import { PrismaClient, BookStatus } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export const changeBookStatusController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id, newBookStatus } = req.body
    if (
      typeof id === 'number' &&
      typeof newBookStatus === 'number' &&
      (newBookStatus >= 0 || newBookStatus <= 1)
    ) {
      const newStatusEnum =
        newBookStatus === 1 ? BookStatus.Public : BookStatus.Hidden // 0 for hidden , 1 for public

      await prisma.book.update({
        where: { id },
        data: { bookStatus: newStatusEnum }
      })
      return res.status(200).json({ msg: `changed to  ${newStatusEnum}` })
    } else {
      return res.status(400).json({ msg: 'Invalid or missing fields.' })
    }
  } catch (e) {
    //@ts-ignore
    if (e.code === 'P2025') {
      return res
        .status(400)
        .json({ msg: 'The id does not exist in the table.' })
    }
    console.log(e)
    return res.status(500).json({ msg: 'internal server error' })
  } finally {
    ;async () => {
      await prisma.$disconnect()
    }
  }
}
