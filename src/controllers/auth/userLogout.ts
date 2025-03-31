import { Request, Response } from 'express'

import { userCookieValidator } from '../../utils/userCookieValidator'
import { ParsedUserCookieInterface } from '../../utils/ParsedUserCookieInterface'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const userLogoutController = async (req: Request, res: Response) => {
  const userCookie = req.signedCookies['userCookie']

  if (!userCookie) {
    return res.status(401).json({ msg: 'Unauthenticated request' })
  }

  const decryptedObject: ParsedUserCookieInterface | boolean =
    userCookieValidator(userCookie)

  if (!decryptedObject) {
    return res.status(401).json({ msg: 'Unauthenticated request' })
  }

  try {
    const id = decryptedObject.id
    await prisma.session.delete({ where: { id } })
    await prisma.$disconnect()
    res.clearCookie('userCookie')
    res.status(200).json({ msg: 'Logged out successfully' })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ msg: 'Internal server error' })
  }
}
