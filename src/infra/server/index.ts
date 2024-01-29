import cors from 'cors'
import express,
{
  type ErrorRequestHandler,
  type NextFunction,
  type Request
} from 'express'

import mongodb from '../../infra/database/mongodb'

class Server {
  app: express.Application
  private readonly port: number | string

  constructor (private readonly mongodb: any) {
    this.port = process.env.PORT ?? 8080
    this.app = express()
    this.start()
    this.config()
  }

  private start (): void {
    this.app.listen(this.port,
      () => { console.log(`Server running on port: ${this.port}.`) }
    )
    this.mongodb.connect()
  }

  private config (): void {
    this.app.use(express.json())
    this.app.use(cors())
    this.app.use(this.jsonValidator)
  }

  private jsonValidator (err: ErrorRequestHandler, req: Request, res: any, next: NextFunction): void {
    if (err instanceof SyntaxError) {
      return res.status(400).json({ error: 'The req.body is not a valid json.' })
    }
    next()
  }
}

export default new Server(mongodb)
