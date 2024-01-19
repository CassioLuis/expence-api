import { type Request, type Response } from 'express'
import { type Schema } from 'mongoose'

import { type AuthTypes } from '.'

export interface IUser {
  id?: Schema.Types.ObjectId
  name: string
  lastName: string
  email: string
  password: string
}

export interface IUserController {
  create: (req: Request<Record<string, unknown>, Record<string, unknown>, IUser>, res: Response) => Promise<void>
  resetPassword: (req: Request, res: Response) => Promise<void>
}

export interface IUserService {
  create: (register: IUser) => Promise<string>
  resetPassword: (user: IUser) => Promise<AuthTypes.IToken>
}

export interface IUserRepository {
  create: (register: IUser) => Promise<void>
  get: (value: object) => Promise<IUser[] | []>
  update: (params: IUser) => Promise<void>
}
