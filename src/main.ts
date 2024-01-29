import Server from './infra/server'
import routes from './infra/server/routes'

const { app } = Server


app.use(routes)
