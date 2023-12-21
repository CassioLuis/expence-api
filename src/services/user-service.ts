import encodePassword from '../helpers/encode-password'
import { userRepository } from '../repositories'
import { type IUserRegister, type IUserService } from '../types/user-types'

export const userService: IUserService = {
  async create (register: IUserRegister<any>): Promise<any> {
    try {
      const { name, username, email, password }: IUserRegister<any> = register
      // if (!name || !username || !email || !password) return res.status(400).send({ message: 'Existe algum campo invalido' })
      const user = await userRepository.create({ ...register, password: encodePassword(password) })
      // if (!user) return { message: 'Error creating user' }
      return {
        message: 'User created succesfully',
        user: {
          id: user._id,
          name,
          username,
          email,
          password
        }
      }
    } catch (err) {
      return { message: err.message }
    }
  },

  getOne (id: string): any {
  },

  getAll (): any {
  },

  update (register: IUserRegister<string>): any {
  }
}
