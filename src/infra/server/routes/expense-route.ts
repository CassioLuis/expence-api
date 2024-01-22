/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

import { expenseController } from '../../../app/controllers'
import { authMiddleware, reqValidatorMiddleware } from '../../../app/middlewares'

const expenseRouter = Router()
const basePath = '/expense'

expenseRouter.post(`${basePath}`,
  reqValidatorMiddleware.createExpenseValidation,
  authMiddleware.tokenValidation,
  expenseController.create
)

expenseRouter.delete(`${basePath}/:expenseId`,
  authMiddleware.tokenValidation,
  expenseController.delete
)

expenseRouter.get(`${basePath}`,
  authMiddleware.tokenValidation,
  expenseController.get
)

export default expenseRouter
