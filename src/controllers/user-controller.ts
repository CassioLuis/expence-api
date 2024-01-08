import { type IUser, type IUserController } from '@/types/user-types'
import { type Request, type Response } from 'express'

import { UserService } from '../services'

class UserController implements IUserController {
  async create (req: Request<Record<string, unknown>, Record<string, unknown>, IUser>, res: Response): Promise<void> {
    try {
      const response = await UserService.create(req.body)
      res.json(response)
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}

export default new UserController()
