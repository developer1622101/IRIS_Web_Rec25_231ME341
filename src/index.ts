import express, { NextFunction, Request, Response } from 'express'
import path from 'path'

import { authRouter } from './routes/authRoutes'

import cookieParser from 'cookie-parser'

import { appRouter } from './routes/appRoutes'
import { apiRouter } from './routes/apiRoutes'
import { librarianApiRouter } from './routes/librarianAPIs'
import { checkLoggedInMiddleware2 } from './middlewares/checkLoggedInMiddleware2'

const app = express()

app.use(cookieParser(process.env.COOKIE_SECRET_KEY))

app.use(express.json())

app.use(express.static(path.resolve(__dirname, '../views/build')))

app.use('/auth', authRouter)
app.use('/app', appRouter)
app.use('/api', apiRouter)

app.use('/librarianApi', librarianApiRouter)

export { app }
