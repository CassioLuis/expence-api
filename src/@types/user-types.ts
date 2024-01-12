import { type Request, type Response } from 'express'

export interface IUser {
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
  get: (key: string, value: any) => Promise<object[] | []>
  getAll: () => any
}

export interface ILogin {
  email: IUser['email']
  password: IUser['password']
}
