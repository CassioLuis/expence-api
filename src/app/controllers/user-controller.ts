import { type Request, type Response } from 'express'

import { type UserTypes } from '../../@types'
import { UserService } from '../services'

class UserController implements UserTypes.IUserController {
  async create (
    req: Request<Record<string, unknown>, Record<string, unknown>, UserTypes.IUser>,
    res: Response
  ): Promise<void> {
    try {
      await UserService.create(req.body)
      res.sendStatus(201)
    } catch {
      res.sendStatus(500)
    }
  }

  async login (req: Request<any, any, UserTypes.ILogin>, res: Response): Promise<Response> {
    try {
      const response = await UserService.login(req.body)
      return res.status(200).json(response)
    } catch (error: any) {
      return res.status(401).json({ error: error.message })
    }
  }
}

export default new UserController()
