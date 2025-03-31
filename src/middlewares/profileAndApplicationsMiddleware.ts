import { NextFunction, Request, Response } from 'express'

import { PrismaClient, Profile, Role } from '@prisma/client'

const prisma = new PrismaClient()

declare module 'express-serve-static-core' {
  interface Request {
    role: Role | null
    profile: Profile | null
    userId: number
    applicationPending: boolean
  }
}

const profileAndApplicationsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const role = req.role
  const userId = req.userId

  const profile = await prisma.profile.findUnique({
    where: { userId }
  })

  const application = await prisma.application.findFirst({
    where: { userId, status: 'Pending' }
  })

  const applicationPending = application ? true : false

  req.profile = profile

  req.applicationPending = applicationPending

  return next()
}
export { profileAndApplicationsMiddleware }
