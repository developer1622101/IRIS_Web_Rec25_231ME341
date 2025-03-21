import { NextFunction, Request, Response } from 'express'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
import { encrypt } from '../utils/encrypt'

import { userCookieValidator } from '../utils/userCookieValidator'

const checkLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userCookie = req.signedCookies['userCookie']

  if (!userCookie) {
    return next()
  }

  const decryptedObject = userCookieValidator(userCookie)

  if (!decryptedObject) {
    return next()
  }

  const session = await prisma.session.findFirst({ where: decryptedObject })

  const user = await prisma.user.findUnique({
    where: { email: decryptedObject.email },
    select: { email: true, role: true }
  })

  if (user && session) {
    res.setHeader(
      'authorization',
      encrypt(
        JSON.stringify({
          loggedIn: true,
          email: user.email,
          role: user.role
        })
      )
    )
    return next()
  } else {
    return next()
  }
}
export { checkLoggedIn }
