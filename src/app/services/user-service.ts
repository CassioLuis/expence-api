import { type AuthTypes, type UserTypes } from '../../@types'
import { userRepository } from '../repositories'

class UserService implements UserTypes.IUserService {
  async create (register: UserTypes.IUser): Promise<any> {
    await userRepository.create(register)
    return { message: 'User created succesfully' }
  }

  async resetPassword (user: UserTypes.IUser): Promise<AuthTypes.IToken> {
    // const scretKey = process.env.SECRET_JWT ?? ''
    // const expiresIn = { expiresIn: 100 }
    // const [userData] = await userRepository.get({ email: user.email })
    // const token = tokenAdapter.generateToken({ id: userData.id }, scretKey, expiresIn)
    return { token: 'token' }
  }
}

export default new UserService()
