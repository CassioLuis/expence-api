import MongoDb from '../database/mongoDb'
import { type IUserRepository, type IUserRegister } from '../types/user-types'
import User from './models/user-models'

export const userRepository: IUserRepository = {
  async create (register: IUserRegister<any>): Promise<any> {
    await MongoDb.connect()
    try {
      return await User.create(register)
    } catch (error) {
      return { error }
    } finally {
      await MongoDb.disconnect()
    }
  },
  getOne (id: string): any {
    return User.findById(id)
  },
  getAll (): any {
    return User.find()
  },
  update (register: IUserRegister<string>): any {
    const { id, name, username, email, password } = register
    return User.findOneAndUpdate({ _id: id }, { id, name, username, email, password })
  }
}
