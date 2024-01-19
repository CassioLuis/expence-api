import { type ExpenseTypes } from '../../@types'
import mongodb from '../../infra/database/mongodb'
import Expense from '../../infra/database/mongodb/models/expense-model'

class ExpenseRepository {
  async save (expense: ExpenseTypes.IExpense): Promise<void> {
    await mongodb.connect()
    try {
      await Expense.create(expense)
    } finally {
      await mongodb.disconnect()
    }
  }
}

export default new ExpenseRepository()
