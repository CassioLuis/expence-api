import { type Request, type Response } from 'express'
import { type Schema } from 'mongoose'

import { type IAuthController } from '../../@types/auth-types'
import authService from '../services/auth-service'

class AuthController implements IAuthController {
  async login (
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { token, ...userData } = await authService.login(req.body.id as Schema.Types.ObjectId)
      res.cookie('access-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      })
      res.status(200).json(userData)
    } catch (error: any) {
      res.status(401).json({ error: error.message })
    }
  }

  async googleLogin (
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { credential } = req.body
      if (!credential) {
        res.status(400).json({ error: 'Google credential is required' })
        return
      }
      const { token, ...userData } = await authService.googleLogin(credential)
      res.cookie('access-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      })
      res.status(200).json(userData)
    } catch (error: any) {
      res.status(401).json({ error: error.message })
    }
  }
  async logout (
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      res.clearCookie('access-token')
      res.status(200).json({ message: 'Logged out successfully' })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }
}

export default new AuthController()
