import express from 'express'

class Server {
  server: express.Application
  private readonly port: number | string

  constructor () {
    this.port = process.env.PORT ?? 8080
    this.server = express()
    this.start()
  }

  private start (): void {
    this.server.use(express.json())
    this.server.listen(this.port,
      () => { console.log(`Server running on port: ${this.port}.`) }
    )
  }
}

export default Server
