// this will check if user is logged in and adds the role to the req , just that.

import { NextFunction, Request, Response } from 'express'

import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

import { userCookieValidator } from '../utils/userCookieValidator'

declare module 'express-serve-static-core' {
  interface Request {
    role: Role | null
    userId: number
    banned: boolean
  }
}

const checkLoggedInMiddleware2 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userCookie = req.signedCookies['userCookie']

  if (!userCookie) {
    return res.redirect('/auth/login')
  }

  const decryptedObject = userCookieValidator(userCookie)

  if (!decryptedObject) {
    return res.redirect('/auth/login')
  }

  const session = await prisma.session.findFirst({ where: decryptedObject })

  const user = await prisma.user.findUnique({
    where: { email: decryptedObject.email },
    select: {
      id: true,
      role: true,
      banned: true,
      Profile: { omit: { userId: true } }
    }
  })

  if (user && session) {
    req.role = user.role

    req.userId = user.id

    req.banned = user.banned

    return next()
  } else {
    return res.redirect('/auth/login')
  }
}

export { checkLoggedInMiddleware2 }
