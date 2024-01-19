/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

import { userController } from '../../../app/controllers'
import { reqValidatorMiddleware } from '../../../app/middlewares'

const usersRouter = Router()
const basePath = '/users'

usersRouter.post(`${basePath}`,
  reqValidatorMiddleware.createUserValidation,
  userController.create
)

usersRouter.post(`${basePath}/resetPassword`,
  reqValidatorMiddleware.emailValidation,
  userController.resetPassword
)

export default usersRouter
