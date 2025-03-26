import Route from 'express'
import path from 'path'

const appRouter = Route()

appRouter.use(async (req, res, next) => {
  const cookie = req.signedCookies['userCookie']

  if (!cookie) {
    return res.redirect('/auth/signup')
  }
  next()
})

appRouter.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../views/build/index.html'))
})

export { appRouter }
