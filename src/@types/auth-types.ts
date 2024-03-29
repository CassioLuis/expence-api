import { type Request, type Response } from 'express'
import { type Schema } from 'mongoose'

import { type IUser } from './user-types'

export interface ILogin {
  id?: IUser['id']
  email: IUser['email']
  password: IUser['password']
}

export interface IToken {
  token: string
}

export interface IAuthController {
  login: (req: Request, res: Response) => Promise<void>
}

export interface IAuthService {
  login: (userId: Schema.Types.ObjectId) => Promise<IToken>
}

export interface IAuthMiddleware {
  credentialsValidation: (req: Request, res: Response) => Promise<Response | undefined>
}
