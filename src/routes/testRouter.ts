import { Request, Response, Router } from 'express'

export const testRouter = Router()

testRouter.get('/hi', (req: Request, res: Response) => {
  res.send('hi there')
})

testRouter.get('', (req: Request, res: Response) => {
  res.send('hi there hello')
})
