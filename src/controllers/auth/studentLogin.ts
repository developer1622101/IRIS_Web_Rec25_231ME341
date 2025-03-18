import { loginStudent } from '../../models/authModel'
import { Request, Response } from 'express'

export const studentLoginController = async (req: Request, res: Response) => {
  const { rollNo_or_email, password } = req.body

  const result = await loginStudent({ rollNo_or_email, password })

  if (result.success) {
    res.status(200).json({ success: true, msg: 'logged in successfully' })
  } else {
    res.status(401).json({ success: false, msg: result.msg })
  }
}
