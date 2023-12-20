import cors from 'cors'

import router, { userRouter } from './routes'
import Server from './server'

const { server } = new Server()

server.use(cors())
server.use(router)
server.use(userRouter)
