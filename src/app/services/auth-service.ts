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
    const user = await User.findById(userId)
    if (!user) {
      throw new Error('User not found')
    }
    const secretKey = process.env.SECRET_JWT ?? ''
    const expiresIn = { expiresIn: '24h' }
    const token = this.tokenHandler.tokenGenerate(userId, secretKey, expiresIn)
    return {
      token,
      name: user.name,
      lastName: user.lastName,
      email: user.email
    }
  }

  private async validateGoogleIdToken (credential: string) {
    const ticket = await client.verifyIdToken({
      idToken: credential,
    })
    const payload = ticket.getPayload()

    if (!payload?.email) {
      throw new Error('Authentication failed')
    }

    return {
      email: payload.email,
      name: payload.given_name ?? 'User',
      lastName: payload.family_name ?? ''
    }
  }

  private async validateGoogleAccessToken (credential: string) {
    const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${credential}` }
    })

    if (!response.ok) {
      throw new Error('Authentication failed')
    }

    const payload = await response.json()

    if (!payload?.email) {
      throw new Error('Authentication failed')
    }

    return {
      email: payload.email,
      name: payload.given_name ?? 'User',
      lastName: payload.family_name ?? ''
    }
  }

  async googleLogin (credential: string): Promise<AuthTypes.IToken> {
    let email: string
    let name: string
    let lastName: string

    if (credential.split('.').length === 3) {
      const idTokenData = await this.validateGoogleIdToken(credential)
      email = idTokenData.email
      name = idTokenData.name
      lastName = idTokenData.lastName
    } else {
      const accessTokenData = await this.validateGoogleAccessToken(credential)
      email = accessTokenData.email
      name = accessTokenData.name
      lastName = accessTokenData.lastName
    }

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

    return {
      token,
      name: user.name,
      lastName: user.lastName,
      email: user.email
    }
  }
}

export default new AuthService(TokenHandlerAdapter)
