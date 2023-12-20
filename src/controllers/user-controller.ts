import { type Request, type Response } from 'express'

import { UserService } from '../services'
import { type IUserRegister, type IUserController } from '../types/user-types'

export const UserController: IUserController = {
  async create (req: Request<any, any, IUserRegister<any>>, res: Response): Promise<any> {
    try {
      await UserService.create(req.body)
    } catch (error) {
      res.json(error)
    }
  },

  async getOne (): Promise<any> {

  },

  async getAll (): Promise<any> {

  },

  async update (): Promise<any> {

  }
}
