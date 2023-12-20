import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => res.send('API Rodando!'))

export { default as userRouter } from './user-router'
export default router
