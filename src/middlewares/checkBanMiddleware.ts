import { NextFunction, Request, Response } from 'express'

const checkBanMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const banned = req.banned

  if (banned) {
    return res.status(200).json({ msg: 'You are banned' })
  }

  return next()
}
export { checkBanMiddleware }
