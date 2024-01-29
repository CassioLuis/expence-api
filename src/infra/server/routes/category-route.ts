/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

import { categoryController } from '../../../app/controllers'
import { authMiddleware, reqValidatorMiddleware } from '../../../app/middlewares'

const categoryRoute = Router()
const basePath = '/category'

// POST
categoryRoute.post(`${basePath}`,
  authMiddleware.tokenValidation,
  reqValidatorMiddleware.createCategoryValidation,
  categoryController.create.bind(categoryController)
)

// DELETE
categoryRoute.delete(`${basePath}/:categoryId`,
  authMiddleware.tokenValidation,
  categoryController.delete.bind(categoryController)
)

// GET
categoryRoute.get(`${basePath}`,
  authMiddleware.tokenValidation,
  categoryController.getAllByUser.bind(categoryController)
)

// PATCH
categoryRoute.patch(`${basePath}/:categoryId`,
  authMiddleware.tokenValidation,
  reqValidatorMiddleware.updateExpenseValidation,
  categoryController.update.bind(categoryController)
)

export default categoryRoute
