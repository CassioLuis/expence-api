import { type UserTypes } from '../../@types'
import MongoDb from '../../infra/database/mongodb'
import UserModel from '../../infra/database/mongodb/models/user-model'

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
    value: object,
    select = '-password'
  ): Promise<UserTypes.IUser[] | []> {
    await MongoDb.connect()
    try {
      return await UserModel.find(value).select(select)
    } finally {
      await MongoDb.disconnect()
    }
  }

  async update (user: UserTypes.IUser): Promise<void> {
    const { id, name, lastName, email, password } = user
    await UserModel.findOneAndUpdate({ _id: id }, { id, name, lastName, email, password })
  }
}

export default new UserRepository()
