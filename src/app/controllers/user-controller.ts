import { type Request, type Response } from 'express'

import { type UserTypes } from '../../@types'
import { userService } from '../services'

class UserController implements UserTypes.IUserController {
  async create (
    req: Request<Record<string, unknown>, Record<string, unknown>, UserTypes.IUser>,
    res: Response
  ): Promise<void> {
    try {
      await userService.create(req.body)
      res.sendStatus(201)
    } catch {
      res.sendStatus(500)
    }
  }

  async login (req: Request<any, any, UserTypes.ILogin>, res: Response): Promise<Response> {
    try {
      const response = await userService.login(req.body)
      return res.status(200).json(response)
    } catch (error: any) {
      if (error.message === 'Invalid user') {
        return res.status(401).json({ error: error.message })
      }
      return res.sendStatus(500)
    }
  }
}

export default new UserController()
