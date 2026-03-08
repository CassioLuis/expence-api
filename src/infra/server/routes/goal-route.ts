/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

import { goalController } from '../../../app/controllers'
import { authMiddleware } from '../../../app/middlewares'

const goalRoute = Router()
const basePath = '/metrics/goals'

// GET
goalRoute.get(`${basePath}`,
  authMiddleware.tokenValidation,
  goalController.getAllByUser.bind(goalController)
)

// POST
goalRoute.post(`${basePath}`,
  authMiddleware.tokenValidation,
  goalController.upsert.bind(goalController)
)

export default goalRoute
