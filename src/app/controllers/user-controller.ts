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

  async resetPassword (req: Request, res: Response): Promise<void> {
    try {
      const reponse = await userService.resetPassword(req.body as UserTypes.IUser)
      res.status(200).json(reponse)
    } catch {
      res.sendStatus(500)
    }
  }
}

export default new UserController()
