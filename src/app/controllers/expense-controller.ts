import { type Request, type Response } from 'express'

import { type ExpenseTypes } from '../../@types'
import { expenseService } from '../services'

class ExpenseController {
  errorHandler ({ message }: any, res: Response): void {
    const error = expenseService.errorMessages[message]
    if (error) {
      res.status(error.status).json({ message: error.message })
      return
    }
    res.sendStatus(500)
  }

  async create (req: Request, res: Response): Promise<void> {
    try {
      await expenseService.create(req.body as ExpenseTypes.IExpense)
      res.sendStatus(201)
    } catch (error: any) {
      this.errorHandler(error, res)
    }
  }

  async delete (req: Request, res: Response): Promise<void> {
    try {
      const deletePayload: ExpenseTypes.IDeletePayload = {
        userId: req.body.user,
        expenseId: req.params.expenseId
      }
      await expenseService.delete(deletePayload)
      res.sendStatus(204)
    } catch (error: any) {
      this.errorHandler(error, res)
    }
  }

  async getAllByUser (req: Request, res: Response): Promise<void> {
    try {
      const { user } = req.body
      const expenses = await expenseService.getByUser(user as unknown as ExpenseTypes.IExpense['user'])
      res.status(200).json(expenses)
    } catch (error: any) {
      this.errorHandler(error, res)
    }
  }

  async getById (req: Request, res: Response): Promise<void> {
    try {
      const { expenseId } = req.params
      const expense = await expenseService.getById(expenseId)
      res.status(200).json(expense)
    } catch (error: any) {
      this.errorHandler(error, res)
    }
  }

  async getAnalitic (req: Request, res: Response): Promise<void> {
    try {
      const { iniDate, finDate } = req.query
      const { user } = req.body
      const expenses = await expenseService.getByDateInterval(
        user as string, iniDate as string, finDate as string
      )
      res.status(200).json(expenses)
    } catch (error: any) {
      this.errorHandler(error, res)
    }
  }

  async update (req: Request, res: Response): Promise<void> {
    try {
      const { expenseId } = req.params
      const response = await expenseService.update(
        req.body as ExpenseTypes.IExpenseUpdate, expenseId as unknown as ExpenseTypes.IExpense['_id']
      )
      res.status(200).json(response)
    } catch (error: any) {
      this.errorHandler(error, res)
    }
  }
}

export default new ExpenseController()
