import { Router } from 'express'
const apiRouter = Router()

import { publicApiRouter } from './publicApiRouter'
import { studentApiRouter } from './studentApiRouter'
import { librarianApiRouter } from './librarianAPIs'
import { adminRouter } from './adminAPIs'

apiRouter.use('/public', publicApiRouter)

apiRouter.use('/student', studentApiRouter)

apiRouter.use('/librarian', librarianApiRouter)

apiRouter.use('/admin', adminRouter)

export { apiRouter }
