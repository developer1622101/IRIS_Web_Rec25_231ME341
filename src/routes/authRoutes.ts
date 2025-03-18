import express from 'express'

import { studentLoginController } from '../controllers/auth/studentLogin'
const authRouter = express.Router()

import { loginStudent } from '../models/authModel'

authRouter.post('/login', studentLoginController)

authRouter.post('/logout', async () => {})

export { authRouter }
