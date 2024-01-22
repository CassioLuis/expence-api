import { type Schema } from 'mongoose'

import { type AuthTypes } from '../../@types'
import { TokenHandlerAdapter, type TokenHandlerContract } from '../adapters/tokenHandler'

class AuthService implements AuthTypes.IAuthService {
  constructor (private readonly tokenHandler: TokenHandlerContract) { }

  async login (userId: Schema.Types.ObjectId): Promise<AuthTypes.IToken> {
    const secretKey = process.env.SECRET_JWT ?? ''
    const expiresIn = { expiresIn: '10min' }
    const token = this.tokenHandler.tokenGenerate(userId, secretKey, expiresIn)
    return { token }
  }
}

export default new AuthService(TokenHandlerAdapter)
