import { userService } from '../services'
import { type IUserController } from '../types/user-types'

export const userController: IUserController = {
  async create (req, res) {
    try {
      const response = await userService.create(req.body)
      res.json(response)
    } catch (error) {
      res.status(500).json({ error })
    }
  },

  async getOne (): Promise<any> {

  },

  async getAll (): Promise<any> {

  },

  async update (): Promise<any> {

  }
}
