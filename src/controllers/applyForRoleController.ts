import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

export const applyForRoleController = async (req: Request, res: Response) => {
  if (!req.profile) {
    return res.status(200).json({
      msg: 'You must create a profile first to issue a library card or get any other roles.'
    })
  }

  const { roleRequested } = req.body

  if (req.role === roleRequested) {
    return res.status(200).json({
      msg: 'You already have this role.'
    })
  }

  const prisma = new PrismaClient()

  try {
    if (req.userId) {
      const verification = await prisma.application.findFirst({
        where: { userId: req.userId, roleRequested }
      })

      if (verification) {
        return res.status(200).json({
          msg: `You have already applied for the role of ${roleRequested} `
        })
      }

      await prisma.application.create({
        data: { userId: req.userId, currentRole: req.role, roleRequested }
      })
      return res.status(201).json({
        msg: 'Application created successfully and sent  for verification.'
      })
    }
  } catch (e) {
    return res.status(500).json({ msg: 'Internal server error.' })
  } finally {
    ;async () => {
      await prisma.$disconnect()
    }
  }
}
