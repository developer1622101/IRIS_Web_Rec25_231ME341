import { Router, Response, Request, NextFunction } from 'express'

import { profileAndApplicationsMiddleware } from '../middlewares/profileAndApplicationsMiddleware'
import { createTokenController } from '../controllers/createTokenController'
import {
  allTokensController,
  currentTokensController
} from '../controllers/studentTokenController'
import { checkLoggedInMiddleware2 } from '../middlewares/checkLoggedInMiddleware2'
import { checkBanMiddleware } from '../middlewares/checkBanMiddleware'

export const studentApiRouter = Router()

studentApiRouter.use(checkLoggedInMiddleware2)

studentApiRouter.use(profileAndApplicationsMiddleware)

studentApiRouter.post(
  '/createToken',
  async (req: Request, res: Response, next: NextFunction) => {
    checkBanMiddleware(req, res, next)
  },
  (req: Request, res: Response) => {
    createTokenController(req, res)
  }
)

studentApiRouter.get('/currentTokens', (req: Request, res: Response) => {
  currentTokensController(req, res)
})
studentApiRouter.get('/allTokens', (req: Request, res: Response) => {
  allTokensController(req, res)
})
