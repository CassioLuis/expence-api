import { type Request, type Response } from 'express'

export interface IUser {
  name: string
  lastName: string
  email: string
  password: string
}

export interface IUserController {
  create: (req: Request<Record<string, unknown>, Record<string, unknown>, IUser>, res: Response) => Promise<void>
}

export interface IUserService {
  create: (register: IUser) => Promise<any>
}

export interface IUserRepository {
  create: (register: IUser) => Promise<any>
  get: (param: object) => Promise<object[] | []>
  getAll: () => any
}
