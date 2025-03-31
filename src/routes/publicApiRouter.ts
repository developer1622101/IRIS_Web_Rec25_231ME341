import { PrismaClient } from '@prisma/client'
import { Router, Request, Response } from 'express'
import { checkLoggedInMiddleware2 } from '../middlewares/checkLoggedInMiddleware2'
import { searchController } from '../controllers/searchController'
import { publicBooksController } from '../controllers/publicBooksController'
import { checkLoggedIn2 } from '../utils/checkLoggedIn2'
import { createProfileContoller } from '../controllers/createProfileController'
import { applyForRoleController } from '../controllers/applyForRoleController'
import { getEditionsController } from '../controllers/getEditionsController'
import { profileAndApplicationsMiddleware } from '../middlewares/profileAndApplicationsMiddleware'
import { bookWithEditionController } from '../controllers/getBookWithEdition'

export const publicApiRouter = Router()

publicApiRouter.get('/checkLoggedIn', async (req: Request, res: Response) => {
  await checkLoggedIn2(req, res)
})

publicApiRouter.use(checkLoggedInMiddleware2)

publicApiRouter.get('/books', async (req: Request, res: Response) => {
  publicBooksController(req, res)
})

publicApiRouter.get('/search', (req: Request, res: Response) => {
  searchController(req, res)
})

publicApiRouter.get('/editions', (req: Request, res: Response) => {
  getEditionsController(req, res)
})

publicApiRouter.post('/createProfile', (req: Request, res: Response) => {
  createProfileContoller(req, res)
})

publicApiRouter.get('/bookWithEdition', (req: Request, res: Response) => {
  bookWithEditionController(req, res)
})
publicApiRouter.post(
  '/applyForRole', //@ts-ignor
  profileAndApplicationsMiddleware,
  (req: Request, res: Response) => {
    applyForRoleController(req, res)
  }
)
