import { type Response, type Request, type NextFunction } from 'express'

import { type UserTypes } from '../../@types'
import encode from '../../helpers/encode-password'
import userRepository from '../repositories/user-repository'

class UserMiddleware {
  async loginValidate (
    req: Request<any, any, UserTypes.ILogin>,
    res: Response, next: NextFunction
  ): Promise<any> {
    try {
      const { email, password } = req.body
      const user = await userRepository.get({ email }, '+password')
      const [loged] = user.filter(user => user.password === encode(password))
      if (!loged) return res.status(401).json({ message: 'Invalid user' })
      req.body.id = loged.id
      next()
    } catch {
      res.sendStatus(500)
    }
  }
}

export default new UserMiddleware()
