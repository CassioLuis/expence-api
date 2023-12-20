import { type Request, type Response } from 'express'

export interface IUserController {
  create: (req: Request<any, any, IUserRegister<any>>, res: Response) => Promise<any>
  getOne: () => Promise<any>
  getAll: () => Promise<any>
  update: () => Promise<any>
}

export interface IUserService {
  create: (register: IUserRegister<any>) => any
  getOne: (id: string) => any
  getAll: () => any
  update: (register: IUserRegister<string>) => any
}

export interface IUserRepository {
  create: (register: IUserRegister<any>) => any
  getOne: (id: string) => any
  getAll: () => any
  update: (register: IUserRegister<string>) => any
}

export interface IUserRegister<T> {
  id: T
  name: string
  username: string
  email: string
  password: string
}
