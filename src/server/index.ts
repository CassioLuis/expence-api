import cors from 'cors'
import express from 'express'

class Server {
  app: express.Application
  private readonly port: number | string

  constructor () {
    this.port = process.env.PORT ?? 8080
    this.app = express()
    this.start()
  }

  private start (): void {
    this.app.use(express.json())
    this.app.use(cors())
    this.app.listen(this.port,
      () => { console.log(`Server running on port: ${this.port}.`) }
    )
    this.app.use((err: any, _: any, res: any, next: any) => {
      if (err instanceof SyntaxError) {
        return res.status(400).json({ error: 'The req.body is not a valid json.' })
      }
      next()
    })
  }
}

export default new Server()
