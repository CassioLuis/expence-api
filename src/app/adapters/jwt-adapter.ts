import jwt from 'jsonwebtoken'

import { type ITokenHandlerAdapter } from '../contracts'

export default class JwtAdapter implements ITokenHandlerAdapter {
  constructor (private readonly secretKey: string, private readonly expiresIn: object) {}

  generateToken (login: Record<string, any>): string {
    return jwt.sign({ id: login._id }, this.secretKey, this.expiresIn)
  }

  verifyToken (token: string): Record<string, any> | null {
    try {
      const decoded = jwt.verify(token, this.secretKey)
      return decoded as Record<string, any>
    } catch {
      return {
        error: 'Invalid token'
      }
    }
  }
}
