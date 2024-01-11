import MongoDb from '../database/mongodb'
import UserModel from '../database/mongodb/models/user-models'
import { type IUserRepository, type IUser } from '../types/user-types'

class UserRepository implements IUserRepository {
  async create (register: IUser): Promise<any> {
    await MongoDb.connect()
    try {
      await UserModel.create(register)
    } finally {
      await MongoDb.disconnect()
    }
  }

  async get (param: object): Promise<object[] | []> {
    await MongoDb.connect()
    try {
      const data = await UserModel.find(param)
      return data
    } finally {
      await MongoDb.disconnect()
    }
  }

  getAll (): any {
    return UserModel.find()
  }

  // update (id, register): any {
  //   const { name, lastName, email, password } = register
  //   return UserModel.findOneAndUpdate({ _id: id }, { id, name, lastName, email, password })
  // }
}

export default new UserRepository()
