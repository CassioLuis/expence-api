import { type Response, type Request, type NextFunction } from 'express'

import { type AuthTypes } from '../../@types'
import encode from '../../helpers/utils/encode-password'
import { JwtAdapter } from '../adapters'
import userRepository from '../repositories/user-repository'

class AuthMiddleware {
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

  async tokenValidation (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { authorization } = req.headers
      if (!authorization) throw new Error()

      const [schema, token] = authorization.split(' ')
      if (schema !== 'Bearer' || !token) throw new Error()

      const tokeAdapter = new JwtAdapter()
      const decoded = tokeAdapter.verifyToken(token, process.env.SECRET_JWT ?? '')

      // const user = await userRepository.get({ id: decoded.id })
      console.log(decoded)
      // if (!user.id) throw new Error()

      // req.body = { ...req.body, user: user.id }
      // next()
      res.sendStatus(200)
    } catch (error: any) {
      res.status(401).json({ error: 'Invalid token - middleware' })
    }
  }
}

export default new AuthMiddleware()
