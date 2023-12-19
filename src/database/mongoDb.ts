import mongoose, { type Mongoose } from 'mongoose'

interface IMongo {
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  getInstance: () => Mongoose
}

export default class MongoDb implements IMongo {
  private readonly uri: string = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/mydatabase'

  public async connect (): Promise<void> {
    console.log('Connecting to the database...')

    try {
      await mongoose.connect(this.uri)
      console.log('Connected successfully!')
    } catch (error) {
      console.error(error)
    }
  }

  public async disconnect (): Promise<void> {
    await mongoose.disconnect()
    console.log('Disconnected from the database')
  }

  public getInstance (): Mongoose {
    return mongoose
  }
}
