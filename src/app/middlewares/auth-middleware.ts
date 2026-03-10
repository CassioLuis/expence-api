import { type Response, type Request, type NextFunction } from 'express'

import { type AuthTypes } from '../../@types'
import encode from '../../helpers/utils/encode-password'
import { TokenHandlerAdapter } from '../adapters/tokenHandler'
import type ITokenHandlerContract from '../adapters/tokenHandler/tokenHandler-contract'
import userRepository from '../repositories/user-repository'

class AuthMiddleware {
  constructor(readonly TokenHandlerAdapter: ITokenHandlerContract) { }

  async credentialsValidation (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const { email, password } = req.body as AuthTypes.ILogin
      const user = await userRepository.get({ email }, '+password')
      if (!user) return res.status(401).json({ message: 'Invalid user' })
      const loged = user.password === encode(password)
      if (!loged) return res.status(401).json({ message: 'Invalid user' })
      req.body.id = user.id
      next()
    } catch {
      return res.sendStatus(500)
    }
  }

  tokenValidation (req: Request, res: Response, next: NextFunction): any {
    try {
      let token = req.cookies['access-token']

      if (!token && req.headers.authorization) {
        const [schema, bearerToken] = req.headers.authorization.split(' ')
        if (schema === 'Bearer' && bearerToken) {
          token = bearerToken
        }
      }

      if (!token) throw new Error()

      const decoded = TokenHandlerAdapter.tokenVerify(token, process.env.SECRET_JWT ?? '')
      req.body.user = decoded.userId
      next()
    } catch {
      res.status(401).json({ message: 'Invalid token' })
    }
  }
}

export default new AuthMiddleware(TokenHandlerAdapter)
