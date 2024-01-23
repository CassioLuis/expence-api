/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

import { expenseController } from '../../../app/controllers'
import { authMiddleware, reqValidatorMiddleware } from '../../../app/middlewares'

const expenseRouter = Router()
const basePath = '/expenses'

// POST
expenseRouter.post(`${basePath}`,
  reqValidatorMiddleware.createExpenseValidation,
  authMiddleware.tokenValidation,
  expenseController.create.bind(expenseController)
)

// DELETE
expenseRouter.delete(`${basePath}/:expenseId`,
  authMiddleware.tokenValidation,
  expenseController.delete.bind(expenseController)
)

// GET
expenseRouter.get(`${basePath}/:expenseId`,
  authMiddleware.tokenValidation,
  expenseController.getById.bind(expenseController)
)

expenseRouter.get(`${basePath}`,
  authMiddleware.tokenValidation,
  expenseController.getAllByUser.bind(expenseController)
)

export default expenseRouter
