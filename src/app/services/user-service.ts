import { type UserTypes } from '../../@types'
import { JwtAdapter } from '../adapters'
import { type ITokenHandlerAdapter } from '../contracts'
import { userRepository } from '../repositories'

const secretKey = process.env.SECRET_JWT ?? ''
const expiresIn = { expiresIn: 500 }

class UserService implements UserTypes.IUserService {
  constructor (private readonly tokenHandler: ITokenHandlerAdapter) { }

  async create (register: UserTypes.IUser): Promise<any> {
    await userRepository.create(register)
    return {
      message: 'User created succesfully'
    }
  }

  async login (login: UserTypes.ILogin): Promise<any> {
    const token = this.tokenHandler.generateToken(login)
    console.log('Token gerado:', token)
    return { token }
  }
}

export default new UserService(
  new JwtAdapter(secretKey, expiresIn)
)
