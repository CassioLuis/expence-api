/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

import { userController } from '../controllers'
import { validationMiddleware } from '../middlewares/validation-middleware'

const userRouter = Router()
const basePath = '/user'

userRouter.post(`${basePath}/create`, validationMiddleware.createUserValidation, userController.create)
// userRouter.get('/', UserController.getAll)
// userRouter.get('/:id', validId, validUser, UserController.getOne)
// userRouter.patch('/:id', validId, validUser, UserController.update)

export default userRouter
