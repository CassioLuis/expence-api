/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

import { userController } from '../../../app/controllers'
import { reqValidatorMiddleware, userMiddleware } from '../../../app/middlewares'

const usersRouter = Router()
const basePath = '/users'

usersRouter.post(`${basePath}`,
  reqValidatorMiddleware.createUserValidation,
  userController.create
)

usersRouter.post(`${basePath}/login`,
  reqValidatorMiddleware.loginValidation,
  userMiddleware.loginValidate,
  userController.login
)
// userRouter.get('/', UserController.getAll)
// userRouter.get('/:id', validId, validUser, UserController.getOne)
// userRouter.patch('/:id', validId, validUser, UserController.update)

export default usersRouter
