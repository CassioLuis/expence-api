import { type ExpenseTypes } from '../../@types'
import { expenseRepository } from '../repositories'

class ExpenseService {
  public readonly errorMessage = 'Expense not found'

  async create (expense: ExpenseTypes.IExpense): Promise<void> {
    await expenseRepository.save(expense)
  }

  async delete (deletePayload: ExpenseTypes.IDeletePayload): Promise<void> {
    const expenses = await expenseRepository.getByUser(deletePayload.userId)
    if (!expenses?.length) throw new Error(this.errorMessage)
    const [expenseToDelete] = expenses.filter(expense => expense.id === deletePayload.expenseId)
    if (!expenseToDelete) throw new Error(this.errorMessage)
    await expenseRepository.delete(expenseToDelete.id)
  }

  async getByUser (userId: ExpenseTypes.IExpense['user']): Promise<ExpenseTypes.IExpense[] | undefined> {
    const expenses = await expenseRepository.getByUser(userId)
    if (!expenses?.length) throw new Error(this.errorMessage)
    return expenses
  }

  async getById (id: ExpenseTypes.IExpense['id']): Promise<ExpenseTypes.IExpense[] | undefined> {
    const expense = await expenseRepository.getById(id)
    if (!expense?.length) throw new Error(this.errorMessage)
    return expense
  }
}

export default new ExpenseService()
