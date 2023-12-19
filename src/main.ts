import cors from 'cors'

import MongoDb from '../src/database/mongoDb'
import router from '../src/routes'
import Server from './server'

const { server } = Server

const mongo = new MongoDb()

await mongo.connect()

server.use(cors())
server.use(router)
