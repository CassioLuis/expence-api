import { Router } from 'express'

import swaggerRoute from './swagger-route'
import usersRoute from './user-route'

const router = Router()

router.use(usersRoute)

router.use('/doc', swaggerRoute)

export default router
