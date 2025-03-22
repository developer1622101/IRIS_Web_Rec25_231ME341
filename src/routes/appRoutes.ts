import Route from 'express'
import path from 'path'
import { checkLoggedIn } from '../middlewares/checkLoggedIn'

const appRouter = Route()

//appRouter.use(checkLoggedIn)

appRouter.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../views/build/index.html'))
})

export { appRouter }
