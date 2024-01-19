import { type Request, type Response } from 'express'

import { type ExpenseTypes } from '../../@types'
import { expenseService } from '../services'

class ExpenseController {
  async create (req: Request, res: Response): Promise<void> {
    try {
      await expenseService.create(req.body as ExpenseTypes.IExpense)
      res.status(201).json(req.body)
    } catch (error: any) {
      console.log(error)
      res.sendStatus(500)
    }
  }
}

export default new ExpenseController()
