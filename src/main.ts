import Server from './server'
import routes from './server/routes'

const { app } = Server

app.use(routes)
