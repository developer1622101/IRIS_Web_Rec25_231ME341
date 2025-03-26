import { NextFunction, Request, Response } from 'express'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

import { userCookieValidator } from '../utils/userCookieValidator'

const checkLoggedIn2 = async (req: Request, res: Response) => {
  try {
    const userCookie = req.signedCookies['userCookie']

    if (!userCookie) {
      return res.status(200).json({ loggedIn: false })
    }

    const decryptedObject = userCookieValidator(userCookie)

    if (!decryptedObject) {
      return res.status(200).json({ loggedIn: false })
    }

    const session = await prisma.session.findFirst({ where: decryptedObject })

    const user = await prisma.user.findUnique({
      where: { email: decryptedObject.email },
      select: { email: true, id: true, role: true }
    })

    if (user && session) {
      const profile = await prisma.profile.findUnique({
        where: { userId: user.id },
        omit: { userId: true }
      })

      return res.json({
        loggedIn: true,
        email: user.email,
        role: user.role,
        id: user.id,
        profile
      })
    } else {
      return res.status(200).json({ loggedIn: false })
    }
  } catch (e) {
    return res.status(500).json({ msg: 'internal server error' })
  }
}
export { checkLoggedIn2 }
