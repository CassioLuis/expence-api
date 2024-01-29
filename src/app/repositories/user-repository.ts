import { type UserTypes } from '../../@types'
import MongoDb from '../../infra/database/mongodb'
import UserModel from '../../infra/database/mongodb/models/user-model'

class UserRepository implements UserTypes.IUserRepository {
  async create (register: UserTypes.IUser): Promise<any> {
    await UserModel.create(register)
  }

  async get (
    value: object,
    select = '-password'
  ): Promise<UserTypes.IUser[] | []> {
    return await UserModel.find(value).select(select)
  }

  async update (user: UserTypes.IUser): Promise<void> {
    const { id, name, lastName, email, password } = user
    await UserModel.findOneAndUpdate({ _id: id }, { id, name, lastName, email, password })
  }
}

export default new UserRepository()
