import MongoDb from '../database/mongodb'
import User from '../database/mongodb/models/user-models'
import { type IUserRepository, type IUser } from '../types/user-types'

class UserRepository implements IUserRepository {
  async create (register: IUser): Promise<any> {
    try {
      await MongoDb.connect()
      return await User.create(register)
    } finally {
      await MongoDb.disconnect()
    }
  }

  async get (param: object): Promise<object[] | []> {
    try {
      await MongoDb.connect()
      return await User.find(param)
    } finally {
      await MongoDb.disconnect()
    }
  }

  getAll (): any {
    return User.find()
  }

  // update (id, register): any {
  //   const { name, lastName, email, password } = register
  //   return User.findOneAndUpdate({ _id: id }, { id, name, lastName, email, password })
  // }
}

export default new UserRepository()
