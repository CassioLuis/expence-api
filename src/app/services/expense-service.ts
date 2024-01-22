import { type ExpenseTypes } from '../../@types'
import { expenseRepository } from '../repositories'

class ExpenseService {
  async create (expense: ExpenseTypes.IExpense): Promise<void> {
    await expenseRepository.save(expense)
  }

  async delete (deletePayload: ExpenseTypes.IDeletePayload): Promise<void> {
    const expenses = await expenseRepository.get({ id: deletePayload.expenseId })
    if (!expenses) throw new Error()
    for (const expense of expenses) {
      if (expense.user !== deletePayload.userId) return
      await expenseRepository.delete(expense.id)
    }
  }

  async get (userId: ExpenseTypes.IExpense['user']): Promise<ExpenseTypes.IExpense[] | undefined> {
    const expenses = await expenseRepository.get({ user: userId })
    if (!expenses) throw new Error()
    return expenses
  }
}

export default new ExpenseService()
