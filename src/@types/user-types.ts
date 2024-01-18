import { type Request, type Response } from 'express'
import { type Schema } from 'mongoose'

export interface IUser {
  id?: Schema.Types.ObjectId
  name: string
  lastName: string
  email: string
  password: string
}

export interface IUserController {
  create: (req: Request<Record<string, unknown>, Record<string, unknown>, IUser>, res: Response) => Promise<void>
  login: (req: Request<any, any, ILogin>, res: Response) => Promise<Response>
}

export interface IUserService {
  create: (register: IUser) => Promise<any>
  login: (params: ILogin) => Promise<any>
}

export interface IUserRepository {
  create: (register: IUser) => Promise<void>
  get: (value: object) => Promise<IUser[] | []>
}

export interface ILogin {
  id?: IUser['id']
  email: IUser['email']
  password: IUser['password']
}
