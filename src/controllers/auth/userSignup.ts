import { Request, Response } from 'express'
import { signUpModel } from '../../models/signupModel'

export const userSignUpController = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const response = await signUpModel({ email, password })
  return res.status(response.status).json({ msg: response.msg })
}
