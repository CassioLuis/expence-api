import { type IUser, type IUserService } from '@/types/user-types'

// import encodePassword from '../helpers/encode-password'
import { userRepository } from '../repositories'

export const userService: IUserService = {
  async create (register: IUser): Promise<any> {
    try {
      await userRepository.create(register)
      return {
        message: 'User created succesfully'
      }
    } catch (err: any) {
      return { message: err.message }
    }
  },

  getOne (id: string): any {
  },

  getAll (): any {
  },

  update (register: IUser): any {
  }
}
