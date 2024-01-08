/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

import { UserController } from '../controllers'
import { ValidationMiddleware } from '../middlewares'

const usersRouter = Router()
const basePath = '/users'

usersRouter.post(`${basePath}`, ValidationMiddleware.createUserValidation, UserController.create)
// userRouter.get('/', UserController.getAll)
// userRouter.get('/:id', validId, validUser, UserController.getOne)
// userRouter.patch('/:id', validId, validUser, UserController.update)

export default usersRouter
