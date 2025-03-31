import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export const getTokensController = async (req: Request, res: Response) => {
  try {
    const tokens = await prisma.token.findMany({
      where: {
        OR: [{ returned: false }, { dues: { gt: 0 } }]
      },
      include: {
        borrower: {
          select: {
            Profile: {
              omit: {
                userId: true
              }
            }
          }
        }
      }
    })

    return res.status(200).json({ tokens })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ msg: 'internal server error.' })
  } finally {
    ;async () => {
      await prisma.$disconnect()
    }
  }
}

export const tokenCollectedController = async (req: Request, res: Response) => {
  try {
    const { tokenId } = req.body

    if (!tokenId || typeof tokenId !== 'number') {
      return res.status(400).json({ msg: 'missing / invalid fields.' })
    }

    await prisma.token.update({
      where: { id: tokenId },
      data: { collected: true }
    })

    return res.status(201).json({ msg: 'token  data updated ' })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ msg: 'internal server error' })
  } finally {
    ;async () => await prisma.$disconnect()
  }
}

export const tokenReturnedController = async (req: Request, res: Response) => {
  try {
    const { tokenId } = req.body

    if (!tokenId || typeof tokenId !== 'number') {
      return res.status(400).json({ msg: 'missing / invalid fields.' })
    }

    await prisma.token.update({
      where: { id: tokenId },
      data: { returned: true }
    })
    return res.status(201).json({ msg: 'token  data updated ' })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ msg: 'internal server error' })
  } finally {
    ;async () => await prisma.$disconnect()
  }
}
