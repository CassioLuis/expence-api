import cors from 'cors'

import router from './routes'
import Server from './server'

const { server } = new Server()

server.use(cors())
server.use(router)
