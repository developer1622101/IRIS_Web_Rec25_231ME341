import express, { NextFunction, Request, Response } from 'express'
import path from 'path'

import { authRouter } from './routes/authRoutes'

import cookieParser from 'cookie-parser'
import { decrypt } from './utils/encrypt'
import { appRouter } from './routes/appRoutes'

const app = express()

app.use(cookieParser())

app.use(express.json())

app.use(express.static(path.resolve(__dirname, '../views/build')))

app.use('/auth', authRouter)
app.use('/app', appRouter)

/*
app.post('/decrypt', (req: Request, res: Response) => {
  const authHeader = req.body.authHeader

  if (!authHeader) {
    res.status(400).json({ msg: 'Missing authHeader' })
  }

  if (typeof authHeader === 'string') {
    const decryptedString: string = decrypt(authHeader)

    res.status(200).json({ decryptedString })
  } else {
    res.status(400).json({ msg: 'Invalid authHeader' })
  }
})*/

export { app }
