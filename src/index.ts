import express from 'express'
import path from 'path'

import { authRouter } from './routes/authRoutes'

const app = express()

app.use(express.json())

app.use(express.static(path.resolve(__dirname, '../views/build')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/build/index.html'))
})

app.use('/auth', authRouter)

export { app }
