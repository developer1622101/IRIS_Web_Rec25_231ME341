import Route from 'express'
import path from 'path'

const appRoutes = Route()

import { checkLoggedIn } from '../middlewares/checkLoggedIn'

appRoutes.use(checkLoggedIn)

appRoutes.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/build/index.html'))
})
