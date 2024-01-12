import { type UserTypes } from '../../@types'
import MongoDb from '../../database/mongodb'
import UserModel from '../../database/mongodb/models/user-models'

class UserRepository implements UserTypes.IUserRepository {
  async create (register: UserTypes.IUser): Promise<any> {
    await MongoDb.connect()
    try {
      await UserModel.create(register)
    } finally {
      await MongoDb.disconnect()
    }
  }

  async get (
    key: string,
    value: any,
    select = '-password'
  ): Promise<UserTypes.IUser[] | []> {
    await MongoDb.connect()
    try {
      const data = await UserModel.find({ [key]: value }).select(select)
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
