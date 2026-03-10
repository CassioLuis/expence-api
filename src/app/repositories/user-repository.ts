import { type UserTypes } from '../../@types'
import UserModel from '../../infra/database/mongodb/models/user-model'

class UserRepository implements UserTypes.IUserRepository {
  async create (register: UserTypes.IUser): Promise<any> {
    await UserModel.create(register)
  }

  async get (value: object, select = '-password'): Promise<UserTypes.IUser | null> {
    const user = await UserModel.findOne(value).select(select)
    return user
  }

  async update (user: UserTypes.IUser): Promise<void> {
    const { id, name, lastName, email, password } = user
    await UserModel.findOneAndUpdate({ _id: id }, { id, name, lastName, email, password })
  }
}

export default new UserRepository()
