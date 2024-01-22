import jwt, { type Secret, type SignOptions } from 'jsonwebtoken'
import { type Schema } from 'mongoose'

import type ITokenHandlerContract from './tokenHandler-contract'

class TokenHandlerAdapter implements ITokenHandlerContract {
  tokenGenerate (
    userId: Schema.Types.ObjectId,
    scretKey: Secret,
    expiresIn: SignOptions | undefined
  ): string {
    return jwt.sign({ userId }, scretKey, expiresIn)
  }

  tokenVerify (token: string, scretKey: Secret): any {
    return jwt.verify(token, scretKey)
  }
}

export default new TokenHandlerAdapter()
