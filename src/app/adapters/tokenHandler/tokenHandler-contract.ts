import { type Secret, type SignOptions } from 'jsonwebtoken'
import { type Schema } from 'mongoose'

export default interface ITokenHandlerContract {
  tokenGenerate: (
    payload: Schema.Types.ObjectId,
    secretOrPrivateKey: Secret,
    options?: SignOptions | undefined
  ) => string

  tokenVerify: (token: string, secretOrPrivateKey: Secret) => any
}
