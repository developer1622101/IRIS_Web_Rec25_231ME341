import express, { NextFunction, Request, Response } from 'express'
import path from 'path'

import { authRouter } from './routes/authRoutes'

import cookieParser from 'cookie-parser'
import { decrypt } from './utils/encrypt'
import { appRouter } from './routes/appRoutes'
import { apiRouter } from './routes/apiRoutes'

const app = express()

app.use(cookieParser(process.env.COOKIE_SECRET_KEY))

app.use(express.json())

app.use(express.static(path.resolve(__dirname, '../views/build')))

app.use('/auth', authRouter)
app.use('/app', appRouter)
app.use('/api', apiRouter)

export { app }
