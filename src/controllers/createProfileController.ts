import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

export const createProfileContoller = async (req: Request, res: Response) => {
  if (req.profile) {
    return res.status(200).json({ msg: 'You already have a profile.' })
  } else {
    const { name, rollNo, yearOfGraduation, branch } = req.body

    const prisma = new PrismaClient()
    try {
      if (req.userId && name && rollNo && yearOfGraduation && branch) {
        await prisma.profile.create({
          data: { userId: req.userId, name, rollNo, yearOfGraduation, branch }
        })
        return res.status(201).json({ msg: 'Profile created.' })
      }
      return res.status(400).json({ msg: 'Missing required fields.' })
    } catch (e) {
      return res.status(500).json({ msg: 'Internal server error' })
    } finally {
      ;async () => await prisma.$disconnect()
    }
  }
}
