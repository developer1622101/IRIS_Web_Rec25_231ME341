import { Request, Response } from 'express'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

import bcrypt from 'bcrypt'

export const userSignUpController = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await prisma.user.findUnique({ where: { email } })

    if (user) {
      return res.status(401).json({ msg: 'Email is already registered.' })
    } else {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      await prisma.user.create({ data: { email, password: hashedPassword } })

      return res.status(201).json({ msg: 'account created successfully.' })
    }
  } catch (e) {
    console.log(e)
    return res.status(500).json({ msg: 'internal server error' })
  } finally {
    ;async () => {
      await prisma.$disconnect()
    }
  }
}
