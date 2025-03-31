import { Router, Request, Response, NextFunction } from 'express'
import { checkLoggedInMiddleware2 } from '../middlewares/checkLoggedInMiddleware2'
import { PrismaClient } from '@prisma/client'

export const adminRouter = Router()

const prisma = new PrismaClient()

adminRouter.use(checkLoggedInMiddleware2)

adminRouter.use((req: Request, res: Response, next: NextFunction) => {
  if (req.role !== 'Admin') {
    res.status(401).json({ msg: 'unauthorised access' })
    return
  }
  next()
})

adminRouter.put('/banUser', async (req: Request, res: Response) => {
  try {
    const { userId, ban } = req.body

    if (typeof userId === 'number' && typeof ban === 'boolean') {
      const u = await prisma.user.findUnique({
        where: {
          id: userId
        }
      })

      if (u?.role === 'Admin') {
        res.status(200).json({ msg: 'U cannot access admin data.' })
        return
      }

      const user = await prisma.user.update({
        where: { id: userId },
        data: { banned: ban },
        omit: { password: true },
        include: { Profile: { omit: { userId: true } } }
      })

      res.status(201).json({ user })
      return
    } else {
      res.status(401).json({ msg: 'Invalid/missing fields' })
      return
    }
  } catch (e) {
    //@ts-ignore
    if (e.code === 'P2025') {
      res.status(401).json({ msg: 'The userId passed does not exist.' })
      return
    }
    console.log(e)
    res.status(500).json({ msg: 'internal server error' })
    return
  } finally {
    ;async () => {
      await prisma.$disconnect()
    }
  }
})

// revoke role

adminRouter.put('/revokeRole', async (req: Request, res: Response) => {
  try {
    const { userId } = req.body

    if (typeof userId === 'number') {
      const u = await prisma.user.findUnique({
        where: {
          id: userId
        }
      })

      if (u?.role === 'Admin') {
        res.status(200).json({ msg: 'U cannot access admin data.' })
        return
      }

      const user = await prisma.user.update({
        where: { id: userId },
        data: { role: null, banned: true },
        omit: { password: true },
        include: { Profile: { omit: { userId: true } } }
      })
      res.status(201).json({ msg: 'Role revoked.' })
      return
    } else {
      res.status(401).json({ msg: 'Invalid/missing fields' })
      return
    }
  } catch (e) {
    //@ts-ignore
    if (e.code === 'P2025') {
      res.status(401).json({ msg: 'The userId passed does not exist.' })
      return
    }
    console.log(e)
    res.status(500).json({ msg: 'internal server error' })
    return
  } finally {
    ;async () => {
      await prisma.$disconnect()
    }
  }
})

adminRouter.get('/getUser', async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string

    if (userId && !Number.isNaN(parseInt(userId))) {
      const u = await prisma.user.findUnique({
        where: {
          id: parseInt(userId)
        }
      })

      if (u?.role === 'Admin') {
        res.status(200).json({ msg: 'U cannot access admin data.' })
        return
      }

      const user = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
        omit: {
          password: true
        },
        include: {
          Profile: {
            omit: { userId: true }
          }
        }
      })

      if (!user) {
        res.status(200).json({ msg: 'No user exists with that userId.' })
        return
      }

      res.status(200).json({ user })
      return
    } else {
      res.status(401).json({ msg: 'Invalid/missing fields' })
      return
    }
  } catch (e) {
    //@ts-ignore
    if (e.code === 'P2025') {
      res.status(401).json({ msg: 'The userId passed does not exist.' })
      return
    }
    console.log(e)
    res.status(500).json({ msg: 'internal server error' })
    return
  } finally {
    ;async () => {
      await prisma.$disconnect()
    }
  }
})
