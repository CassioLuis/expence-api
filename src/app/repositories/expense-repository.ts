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

  async delete (expenseId: ExpenseTypes.IExpense['id']): Promise<void> {
    await mongodb.connect()
    try {
      await Expense.findByIdAndDelete(expenseId)
    } finally {
      await mongodb.disconnect()
    }
  }

  async getAll (): Promise<ExpenseTypes.IExpense[]> {
    await mongodb.connect()
    try {
      const expenses: ExpenseTypes.IExpense[] = await Expense.find()
      return expenses
    } finally {
      await mongodb.disconnect()
    }
  }

  async getByUser (userId: ExpenseTypes.IExpense['id']): Promise<ExpenseTypes.IExpense[] | undefined> {
    await mongodb.connect()
    try {
      const expenses: ExpenseTypes.IExpense[] = await Expense.find({ user: userId })
      return expenses
    } finally {
      await mongodb.disconnect()
    }
  }

  async getById (expenseId: ExpenseTypes.IExpense['id']): Promise<ExpenseTypes.IExpense[] | undefined> {
    await mongodb.connect()
    try {
      const expenses: ExpenseTypes.IExpense[] = await Expense.find({ id: expenseId })
      return expenses
    } finally {
      await mongodb.disconnect()
    }
  }
}

export default new ExpenseRepository()
