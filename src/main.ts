import cors from 'cors'

import { userRouter } from './routes'
import Server from './server'

const { server } = new Server()

server.use(cors())
server.use(userRouter)
