import { type Request, type Response } from 'express'
import { type Schema } from 'mongoose'

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

  async delete (req: Request, res: Response): Promise<void> {
    try {
      const deletePayload: ExpenseTypes.IDeletePayload = {
        userId: req.body.userId,
        expenseId: req.params as unknown as Schema.Types.ObjectId
      }
      await expenseService.delete(deletePayload)
      res.sendStatus(204)
    } catch (error: any) {
      console.log(error)
      res.sendStatus(500)
    }
  }

  async get (req: Request, res: Response): Promise<void> {
    try {
      const expenses = await expenseService.get(req.body.userId as ExpenseTypes.IExpense['user'])
      res.status(200).json(expenses)
    } catch (error: any) {
      console.log(error)
      res.sendStatus(500)
    }
  }
}

export default new ExpenseController()
