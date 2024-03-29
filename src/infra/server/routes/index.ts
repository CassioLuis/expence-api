import { Router } from 'express'

import authRouter from './auth-route'
import expenseRouter from './expense-route'
import swaggerRoute from './swagger-route'
import usersRoute from './user-route'
import categoryRouter from './category-route'

const router = Router()

router.use(usersRoute)
router.use(authRouter)
router.use(expenseRouter)
router.use(categoryRouter)


router.use('/doc', swaggerRoute)

export default router
