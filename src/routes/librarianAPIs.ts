import { Router } from 'express'
import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import { studentApplicationRoutes } from './studentApplicationRouter'
import { changeBookStatusController } from '../controllers/changeBookStatusController'
import { checkLoggedInMiddleware2 } from '../middlewares/checkLoggedInMiddleware2'
import {
  getTokensController,
  tokenCollectedController,
  tokenReturnedController
} from '../controllers/librarianTokenController'

const prisma = new PrismaClient()

export const librarianApiRouter = Router()

librarianApiRouter.use(checkLoggedInMiddleware2)

librarianApiRouter.use((req: Request, res: Response, next: NextFunction) => {
  if (req.role === 'Librarian') {
    next()
    return
  } else {
    res.status(401).json({ msg: 'Unauthorised access' })
    return
  }
})

librarianApiRouter.get('/books', async (req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany({
      include: { cover: { select: { coverId: true } } }
    })
    res.status(200).json({ books })
    return
  } catch (e) {
    console.log(e)
    res.status(500).json({ msg: 'internal server error' })
    return
  } finally {
    ;async () => {
      await prisma.$disconnect()
    }
  }
})

librarianApiRouter.put(
  '/changeBookStatus',
  async (req: Request, res: Response) => {
    changeBookStatusController(req, res)
  }
)

librarianApiRouter.use('/studentApplications', studentApplicationRoutes)

librarianApiRouter.get('/allTokens', async (req: Request, res: Response) => {
  getTokensController(req, res)
})

librarianApiRouter.put(
  '/tokenCollected',
  async (req: Request, res: Response) => {
    tokenCollectedController(req, res)
  }
)

librarianApiRouter.put(
  '/tokenReturned',
  async (req: Request, res: Response) => {
    tokenReturnedController(req, res)
  }
)
