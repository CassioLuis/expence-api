/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

import { UserController } from '../../app/controllers'
import { ReqValidatorMiddleware } from '../../app/middlewares'

const usersRouter = Router()
const basePath = '/users'

usersRouter.post(`${basePath}`, ReqValidatorMiddleware.createUserValidation, UserController.create)
usersRouter.post(`${basePath}/login`, ReqValidatorMiddleware.loginValidation, UserController.login)
// userRouter.get('/', UserController.getAll)
// userRouter.get('/:id', validId, validUser, UserController.getOne)
// userRouter.patch('/:id', validId, validUser, UserController.update)

export default usersRouter
