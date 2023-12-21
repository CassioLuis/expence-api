import mongoose, { type Mongoose } from 'mongoose'

const uri: string = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/mydatabase'

export default class MongoDb {
  static async connect (): Promise<void> {
    console.log('Connecting to the database...')

    try {
      await mongoose.connect(uri)
      console.log('Connected successfully!')
    } catch (error) {
      console.error(error)
    }
  }

  static async disconnect (): Promise<void> {
    await mongoose.disconnect()
    console.log('Disconnected from the database')
  }

  static getInstance (): Mongoose {
    return mongoose
  }
}
