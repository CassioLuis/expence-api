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

  async update (expense: ExpenseTypes.IExpense, expenseId: ExpenseTypes.IExpense['id']): Promise<ExpenseTypes.IExpense | null> {
    await mongodb.connect()
    try {
      return await Expense.findByIdAndUpdate(expenseId, expense, {
        returnDocument: 'after',
        select: '-user'
      })
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
      const expenses: ExpenseTypes.IExpense[] = await Expense
        .find({ user: userId })
        .populate({ path: 'category', select: '-user' })
        .select('-user')

      return expenses
    } finally {
      await mongodb.disconnect()
    }
  }

  async getById (id: ExpenseTypes.IExpense['id'] | string | number): Promise<ExpenseTypes.IExpense[] | undefined> {
    await mongodb.connect()
    try {
      const expense: ExpenseTypes.IExpense[] = await Expense
        .find({ _id: id })
        .populate({ path: 'category', select: '-user' })
        .select('-user')

      return expense
    } finally {
      await mongodb.disconnect()
    }
  }

  async getByDateInterval (
    userId: ExpenseTypes.IExpense['user'] | string | number,
    iniDate: string,
    finDate: string
  ): Promise<ExpenseTypes.IExpense[] | undefined> {
    await mongodb.connect()
    try {
      const expenses: ExpenseTypes.IExpense[] = await Expense
        .find({
          user: userId,
          expenseDate: {
            $gte: iniDate,
            $lte: finDate
          }
        })
        .populate({ path: 'category', select: '-user' })
        .select('-user')

      return expenses
    } finally {
      await mongodb.disconnect()
    }
  }
}

export default new ExpenseRepository()
