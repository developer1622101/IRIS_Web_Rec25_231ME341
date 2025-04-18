import express, { Request, Response } from 'express'
import path from 'path'

import { userLoginController } from '../controllers/auth/userLogin'
const authRouter = express.Router()

import { userLogoutController } from '../controllers/auth/userLogout'
import { userSignUpController } from '../controllers/auth/userSignup'

authRouter.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../views/build/index.html'))
})

authRouter.post('/login', (req: Request, res: Response) => {
  userLoginController(req, res)
})

authRouter.put('/logout', (req: Request, res: Response) => {
  userLogoutController(req, res)
})

authRouter.post('/signup', (req: Request, res: Response) => {
  userSignUpController(req, res)
})

export { authRouter }
