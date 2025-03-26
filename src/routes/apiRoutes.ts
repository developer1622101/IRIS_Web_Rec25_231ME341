import { Router, Request, Response, NextFunction } from 'express'
const apiRouter = Router()

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

import { checkLoggedIn2 } from '../utils/checkLoggedIn2'
import { checkLoggedInMiddleware } from '../middlewares/checkLoggedInMiddleware'
import { createProfileContoller } from '../controllers/createProfileController'
import { applyForRoleController } from '../controllers/applyForRoleController'
import { createTokenController } from '../controllers/createTokenController'
import {
  currentTokensController,
  allTokensController
} from '../controllers/tokenController'

apiRouter.get(
  '/books',
  async (req, res, next) => {
    const cookie = req.signedCookies['userCookie']

    if (!cookie) {
      return res.redirect('/auth/signup')
    }
    next()
  },
  async (req: Request, res: Response) => {
    try {
      const books = await prisma.book.findMany({
        where: {
          cover: {
            some: {}
          }
        },
        include: {
          cover: true
        },
        take: 10
      })

      res.status(200).json({ success: true, books })
    } catch (e) {
      console.log(e)

      res.status(500).json({ success: false, msg: 'internal server error' })
    } finally {
      ;async () => {
        await prisma.$disconnect()
      }
    }
  }
)

apiRouter.get('/checkLoggedIn', async (req: Request, res: Response) => {
  await checkLoggedIn2(req, res)
})

apiRouter.get('/test', async (req: Request, res: Response) => {
  const userTokens = await prisma.user.findUnique({
    where: { id: 1 },
    select: {
      tokens: {
        select: {
          createdAt: true,
          dueDate: true,
          dues: true,
          books: { select: { id: true, title: true, description: true } }
        }
      }
    }
  })

  res.json(userTokens)
  return
})

// The above routes dont need the middleware check.

apiRouter.use(checkLoggedInMiddleware)

apiRouter.post('/createProfile', (req: Request, res: Response) => {
  createProfileContoller(req, res)
})

apiRouter.post('/applyForRole', (req: Request, res: Response) => {
  applyForRoleController(req, res)
})

apiRouter.post('/createToken', (req: Request, res: Response) => {
  createTokenController(req, res)
})

apiRouter.get('/currentTokens', (req: Request, res: Response) => {
  currentTokensController(req, res)
})
apiRouter.get('/allTokens', (req: Request, res: Response) => {
  allTokensController(req, res)
})

export { apiRouter }
