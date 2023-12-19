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
    this.server.listen(this.port,
      () => { console.log(`Server runing on port: ${this.port}`) }
    )
  }
}

export default new Server()
