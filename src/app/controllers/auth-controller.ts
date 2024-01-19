import { type Request, type Response } from 'express'

import { type AuthTypes } from '../../@types'
import { type IAuthController } from '../../@types/auth-types'
import authService from '../services/auth-service'

class AuthController implements IAuthController {
  async login (
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const response = await authService.login(req.body as AuthTypes.ILogin)
      res.status(200).json(response)
    } catch (error: any) {
      res.status(401).json({ error: error.message })
    }
  }
}

export default new AuthController()
