import { Request, Response } from 'express'

import { deleteSession } from '../../models/session/deleteSessionModel'

import { userCookieValidator } from '../../utils/userCookieValidator'
import { ParsedUserCookieInterface } from '../../utils/ParsedUserCookieInterface'

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

  const result = await deleteSession({ id: decryptedObject.id })

  if (!result.success) {
    return res.status(500).json({ msg: 'Internal server error' })
  }

  res.clearCookie('userCookie')

  res.status(200).json({ msg: 'Logged out successfully' })
}
