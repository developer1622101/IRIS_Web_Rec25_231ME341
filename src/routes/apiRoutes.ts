import { Router, Request, Response } from 'express'
const apiRouter = Router()

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
import axios from 'axios'
import { checkLoggedIn } from '../middlewares/checkLoggedIn'
import { checkLoggedIn2 } from '../utils/checkLoggedIn2'

apiRouter.get('/books', async (req: Request, res: Response) => {
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
})

apiRouter.get('/checkLoggedIn', async (req: Request, res: Response) => {
  await checkLoggedIn2(req, res)
})

export { apiRouter }
