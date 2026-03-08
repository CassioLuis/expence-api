import { type Request, type Response } from 'express'

import { UserTypes } from '../../@types'
import { goalService } from '../services'

class GoalController {
  errorHandler ({ message }: any, res: Response): void {
    const error = goalService.errorMessages[message]
    if (error) {
      res.status(error.status).json({ message: error.message })
      return
    }
    res.sendStatus(500)
  }

  async upsert (req: Request, res: Response): Promise<void> {
    try {
      const { user, goals } = req.body
      const response = await goalService.upsertGoals(user as unknown as string, goals)
      res.status(200).json(response)
    } catch (error: any) {
      this.errorHandler(error, res)
    }
  }

  async getAllByUser (req: Request, res: Response): Promise<void> {
    try {
      const { user } = req.body
      const goals = await goalService.getByUser(user as unknown as UserTypes.IUser['id'])
      res.status(200).json(goals)
    } catch (error: any) {
      this.errorHandler(error, res)
    }
  }
}

export default new GoalController()
