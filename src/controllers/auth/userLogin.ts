import { Request, Response } from 'express'

import { encrypt } from '../../utils/encrypt'

import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const userLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const student = await prisma.user.findUnique({
      where: { email }
    })

    if (!student) {
      return res.status(401).json({ sucess: false, msg: 'Invalid Email' })
    }

    const hashedPassword = student.password

    const check = await bcrypt.compare(password, hashedPassword)

    if (!check) {
      return res.status(401).json({ success: false, msg: 'Invalid password.' })
    }

    const session = await prisma.session.create({
      data: {
        email: student.email
      }
    })

    const cookieData = encrypt(JSON.stringify(session))

    res.cookie('userCookie', cookieData, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      signed: true
    })

    return res
      .status(200)
      .json({ success: true, msg: 'logged in successfully' })
  } catch (e) {
    console.log(e)
    return { success: false, msg: 'internal server error' }
  } finally {
    ;async () => {
      await prisma.$disconnect()
    }
  }
}
