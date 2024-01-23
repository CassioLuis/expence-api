import { type Request, type Response } from 'express'
import { type Schema } from 'mongoose'

import { type ExpenseTypes } from '../../@types'
import { expenseService } from '../services'

class ExpenseController {
  errorHandler ({ message }: any, res: Response): void {
    if (message === expenseService.errorMessage) {
      res.status(404).json({ message })
      return
    }
    res.sendStatus(500)
  }

  async create (req: Request, res: Response): Promise<void> {
    try {
      await expenseService.create(req.body as ExpenseTypes.IExpense)
      res.status(201).json(req.body)
    } catch (error: any) {
      res.sendStatus(500)
    }
  }

  async delete (req: Request, res: Response): Promise<void> {
    try {
      const deletePayload: ExpenseTypes.IDeletePayload = {
        userId: req.body.user,
        expenseId: req.params.expenseId as unknown as Schema.Types.ObjectId
      }
      await expenseService.delete(deletePayload)
      res.sendStatus(204)
    } catch (error: any) {
      this.errorHandler(error, res)
    }
  }

  async getAllByUser (req: Request, res: Response): Promise<any> {
    try {
      const { user } = req.body
      const expenses = await expenseService.getByUser(user as unknown as ExpenseTypes.IExpense['user'])
      res.status(200).json(expenses)
    } catch (error: any) {
      this.errorHandler(error, res)
    }
  }

  async getById (req: Request, res: Response): Promise<any> {
    try {
      const { expenseId } = req.params
      const expense = await expenseService.getById(expenseId as unknown as ExpenseTypes.IExpense['id'])
      res.status(201).json(expense)
    } catch (error: any) {
      this.errorHandler(error, res)
    }
  }
}

export default new ExpenseController()
