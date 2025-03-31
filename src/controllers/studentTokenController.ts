import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export const currentTokensController = async (req: Request, res: Response) => {
  const userId = req.userId

  const role = req.role

  if (!userId || !role) {
    return res.status(401).json({ msg: 'Unauthorised access.' })
  }

  const userTokens = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      tokens: {
        where: {
          OR: [{ returned: false }, { dues: { gt: 0 } }]
        },

        select: {
          createdAt: true,
          dueDate: true,
          dues: true,
          books: { select: { id: true, title: true, description: true } },
          collected: true,
          returned: true
        }
      }
    }
  })
  res.status(200).json(userTokens)
}

export const allTokensController = async (req: Request, res: Response) => {
  const userId = req.userId

  const role = req.role

  if (!userId || !role) {
    return res.status(401).json({ msg: 'Unauthorised access.' })
  }

  const userTokens = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      tokens: {
        select: {
          createdAt: true,
          dueDate: true,
          dues: true,
          books: { select: { id: true, title: true, description: true } },
          collected: true,
          returned: true
        }
      }
    }
  })
  res.status(200).json(userTokens)
}
