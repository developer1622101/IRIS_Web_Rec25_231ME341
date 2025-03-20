import express, { Request, Response } from 'express'
import path from 'path'

import { authRouter } from './routes/authRoutes'

import cookieParser from 'cookie-parser'
import { decrypt } from './utils/encrypt'

const app = express()

app.use(cookieParser())

app.use(express.json())

app.use(express.static(path.resolve(__dirname, '../views/build')))

app.post('/decrypt', (req: Request, res: Response) => {
  const authHeader = req.body.authHeader

  if (!authHeader) {
    res.status(400).json({ msg: 'Missing authHeader' })
  }

  const decryptedString: string = decrypt(authHeader)

  res.status(200).json({ decryptedString })
})

app.use('/auth', authRouter)
//app.use('/app', appRouter)

export { app }
