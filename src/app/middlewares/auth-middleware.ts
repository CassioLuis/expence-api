import { type Response, type Request, type NextFunction } from 'express'

import { type AuthTypes } from '../../@types'
import encode from '../../helpers/utils/encode-password'
import { TokenHandlerAdapter } from '../adapters/tokenHandler'
import type ITokenHandlerContract from '../adapters/tokenHandler/tokenHandler-contract'
import userRepository from '../repositories/user-repository'

class AuthMiddleware {
  constructor (readonly TokenHandlerAdapter: ITokenHandlerContract) { }

  async credentialsValidation (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const { email, password } = req.body as AuthTypes.ILogin
      const user = await userRepository.get({ email }, '+password')
      const [loged] = user.filter(user => user.password === encode(password))
      if (!loged) return res.status(401).json({ message: 'Invalid user' })
      req.body.id = loged.id
      next()
    } catch {
      return res.sendStatus(500)
    }
  }

  tokenValidation (req: Request, res: Response, next: NextFunction): any {
    try {
      const { authorization } = req.headers
      if (!authorization) throw new Error()

      const [schema, token] = authorization.split(' ')
      if (schema !== 'Bearer' || !token) throw new Error()

      const decoded = TokenHandlerAdapter.tokenVerify(token, process.env.SECRET_JWT ?? '')
      req.body.user = decoded.userId
      next()
    } catch {
      res.status(401).json({ message: 'Invalid token' })
    }
  }
}

export default new AuthMiddleware(TokenHandlerAdapter)
