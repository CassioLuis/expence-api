import { type IUser, type IUserService } from '@/types/user-types'

import UserRepository from '../repositories/user-repository'

class UserService implements IUserService {
  async create (register: IUser): Promise<any> {
    try {
      await UserRepository.create(register)
      return {
        message: 'User created succesfully'
      }
    } catch (err: any) {
      return { message: err.message }
    }
  }

  // getOne (id: string): any {
  // },

  // getAll (): any {
  // }

  // update (register: IUser): any {
  // }
}

export default new UserService()
