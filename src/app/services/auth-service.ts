import { type Schema } from 'mongoose'

import { type AuthTypes } from '../../@types'
import { TokenHandlerAdapter, type TokenHandlerContract } from '../adapters/tokenHandler'
import crypto from 'crypto'
import { OAuth2Client } from 'google-auth-library'
import User from '../../infra/database/mongodb/models/user-model'

const client = new OAuth2Client()

class AuthService implements AuthTypes.IAuthService {
  constructor(private readonly tokenHandler: TokenHandlerContract) { }

  async login (userId: Schema.Types.ObjectId): Promise<AuthTypes.IToken> {
    const secretKey = process.env.SECRET_JWT ?? ''
    const expiresIn = { expiresIn: '24h' }
    const token = this.tokenHandler.tokenGenerate(userId, secretKey, expiresIn)
    return { token }
  }

  async googleLogin (credential: string): Promise<AuthTypes.IToken> {
    const ticket = await client.verifyIdToken({
      idToken: credential,
    })
    const payload = ticket.getPayload()

    if (!payload?.email) {
      throw new Error('Invalid Google token payload')
    }

    const email = payload.email
    const name = payload.given_name ?? 'User'
    const lastName = payload.family_name ?? ''

    let user = await User.findOne({ email })

    if (!user) {
      const randomPassword = crypto.randomBytes(16).toString('hex')
      user = await User.create({
        name,
        lastName,
        email,
        password: randomPassword
      })
    }

    const secretKey = process.env.SECRET_JWT ?? ''
    const expiresIn = { expiresIn: '24h' }
    const token = this.tokenHandler.tokenGenerate(user._id as unknown as Schema.Types.ObjectId, secretKey, expiresIn)

    return { token }
  }
}

export default new AuthService(TokenHandlerAdapter)
