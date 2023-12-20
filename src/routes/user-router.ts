import { Router } from 'express'

import { UserController } from '../controllers'

const userRouter = Router()

userRouter.post('/', UserController.create)
// userRouter.get('/', UserController.getAll)
// userRouter.get('/:id', validId, validUser, UserController.getOne)
// userRouter.patch('/:id', validId, validUser, UserController.update)

export default userRouter
