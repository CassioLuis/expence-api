import cors from 'cors'

import router from '../src/routes'
import Server from './server'

const { server } = new Server()

server.use(cors())
server.use(router)
