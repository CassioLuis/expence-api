import { usersRouter } from './routes'
import Server from './server'

const { app } = Server

app.use(usersRouter)
