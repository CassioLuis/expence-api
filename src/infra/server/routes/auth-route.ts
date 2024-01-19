/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

import { authController } from '../../../app/controllers'
import { authMiddleware, reqValidatorMiddleware } from '../../../app/middlewares'

const authRouter = Router()
const basePath = '/auth'

authRouter.post(`${basePath}`,
  reqValidatorMiddleware.loginValidation,
  authMiddleware.credentialsValidation,
  authController.login
)

export default authRouter
