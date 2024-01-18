import mongoose, { type Mongoose } from 'mongoose'

const uri: string = process.env.MONGODB_URI ?? ''

class MongoDb {
  async connect (): Promise<void> {
    await mongoose.connect(uri)
  }

  async disconnect (): Promise<void> {
    await mongoose.disconnect()
  }

  getInstance (): Mongoose {
    return mongoose
  }
}

export default new MongoDb()
