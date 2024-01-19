import { type ExpenseTypes } from '../../@types'
import { expenseRepository } from '../repositories'

class ExpenseService {
  async create (expense: ExpenseTypes.IExpense): Promise<void> {
    await expenseRepository.save(expense)
  }
}

export default new ExpenseService()
