import { type AuthTypes } from '../../@types'
import { JwtAdapter } from '../adapters'
import { type Contracts } from '../contracts'

class AuthService implements AuthTypes.IAuthService {
  constructor (private readonly tokenHandler: Contracts.ITokenHandlerAdapter) { }

  async login (login: AuthTypes.ILogin): Promise<AuthTypes.IToken> {
    const secretKey = process.env.SECRET_JWT ?? ''
    const expiresIn = { expiresIn: '10min' }
    const token = this.tokenHandler.generateToken(login, secretKey, expiresIn)
    return { token }
  }
}

export default new AuthService(new JwtAdapter())
