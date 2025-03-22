import { loginUser } from '../../models/loginModel'
import { Request, Response } from 'express'

import { createHash } from 'crypto'

import { createClient } from 'redis'

import { encrypt } from '../../utils/encrypt'

const redisClient = createClient({
  socket: {
    host: '',
    port: 33
  }
})

redisClient.on('error', err => {})

redisClient.connect().catch(console.error)

export const userLoginController = async (req: Request, res: Response) => {
  const { rollNo_or_email, password } = req.body
  console.log(typeof password)
  const hashedPassword = createHash('sha256').update(password).digest('hex')
  const result = await loginUser({ rollNo_or_email, password: hashedPassword })

  if (result.success) {
    const userData = result.session

    const cookieData = encrypt(JSON.stringify(userData))

    res.cookie('userCookie', cookieData, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      signed: true
    })

    return res
      .status(200)
      .json({ success: true, msg: 'logged in successfully' })
  } else {
    return res.status(401).json({ success: false, msg: result.msg })
  }
}
