import MongoDb from '../database/mongoDb'
import { type IUserRepository, type IUser } from '../types/user-types'
import User from './models/user-models'

export const userRepository: IUserRepository = {
  async create (register: IUser): Promise<any> {
    try {
      await MongoDb.connect()
      return await User.create(register)
    } finally {
      await MongoDb.disconnect()
    }
  },

  async get (param: object): Promise<object[] | []> {
    try {
      await MongoDb.connect()
      return await User.find(param)
    } finally {
      await MongoDb.disconnect()
    }
  },

  getAll (): any {
    return User.find()
  },

  update (id, register): any {
    const { name, lastName, email, password } = register
    return User.findOneAndUpdate({ _id: id }, { id, name, lastName, email, password })
  }
}
