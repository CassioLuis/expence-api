import mongoose, { type Mongoose } from 'mongoose'

const uri: string = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/mydatabase'

class MongoDb {
  async connect (): Promise<void> {
    try {
      await mongoose.connect(uri)
      // console.log('Connected on database!')
    } catch (error) {
      console.error(error)
    }
  }

  async disconnect (): Promise<void> {
    await mongoose.disconnect()
    // console.log('Disconnected from the database!')
  }

  getInstance (): Mongoose {
    return mongoose
  }
}

export default new MongoDb()
