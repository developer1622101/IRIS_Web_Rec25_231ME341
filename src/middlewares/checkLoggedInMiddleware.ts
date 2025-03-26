import { NextFunction, Request, Response } from 'express'

import { PrismaClient, Profile, Role } from '@prisma/client'

const prisma = new PrismaClient()

import { userCookieValidator } from '../utils/userCookieValidator'

declare module 'express-serve-static-core' {
  interface Request {
    role: Role | null
    profile: Profile | null
    userId: number | null
    verificationCreated: boolean
  }
}

const checkLoggedInMiddleware = async (
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
    select: { id: true, role: true }
  })

  if (user && session) {
    req.role = user.role

    req.userId = user.id

    const profile = await prisma.profile.findUnique({
      where: { userId: user.id }
    })

    const verification = await prisma.verifications.findFirst({
      where: { userId: user.id }
    })

    const verificationCreated = verification ? true : false

    req.profile = profile

    req.verificationCreated = verificationCreated

    return next()
  } else {
    return res.redirect('/auth/login')
  }
}
export { checkLoggedInMiddleware }
