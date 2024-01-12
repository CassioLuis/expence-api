import { type UserTypes } from '../../@types'
import toBase64 from '../../helpers/encode-password'
import { UserRepository } from '../repositories'

class UserService implements UserTypes.IUserService {
  async create (register: UserTypes.IUser): Promise<any> {
    await UserRepository.create(register)
    return {
      message: 'User created succesfully'
    }
  }

  async login (params: UserTypes.ILogin): Promise<any> {
    const { email, password } = params
    const user = await UserRepository.get('email', email, '+password')
    const loged = user.filter(user => user.password === toBase64(password))
    if (!loged.length) throw new Error('Invalid user')
  }
}

export default new UserService()
