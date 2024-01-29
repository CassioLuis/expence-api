import { CategoryTypes, type ExpenseTypes } from '../../@types'
import mongodb from '../../infra/database/mongodb'
import Expense from '../../infra/database/mongodb/models/expense-model'

class ExpenseRepository {
  async save (expense: ExpenseTypes.IExpense): Promise<void> {
    await Expense.create(expense)
  }

  async update (expense: ExpenseTypes.IExpenseUpdate, expenseId: ExpenseTypes.IExpense['id']): Promise<ExpenseTypes.IExpense | null> {
    return await Expense.findByIdAndUpdate(expenseId, expense, {
      returnDocument: 'after',
      select: '-user'
    })
  }

  async delete (expenseId: ExpenseTypes.IExpense['id']): Promise<void> {
    await Expense.findByIdAndDelete(expenseId)
  }

  async getAll (): Promise<ExpenseTypes.IExpense[]> {
    const expenses: ExpenseTypes.IExpense[] = await Expense.find()
    return expenses
  }

  async getByUser (userId: ExpenseTypes.IExpense['id']): Promise<ExpenseTypes.IExpense[] | undefined> {
    const expenses: ExpenseTypes.IExpense[] = await Expense
      .find({ user: userId })
      .populate({ path: 'category', select: '-user' })
      .select('-user')

    return expenses
  }

  async getById (id: ExpenseTypes.IExpense['id'] | string | number): Promise<ExpenseTypes.IExpense[] | undefined> {
    const expense: ExpenseTypes.IExpense[] = await Expense
      .find({ _id: id })
      .populate({ path: 'category', select: '-user' })
      .select('-user')

    return expense
  }

  async getByDateInterval (
    userId: ExpenseTypes.IExpense['user'] | string | number,
    iniDate: string,
    finDate: string
  ): Promise<ExpenseTypes.IExpense[] | undefined> {
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
  }

  async getByCategory (category: CategoryTypes.ICategory['id']): Promise<ExpenseTypes.IExpense[]> {
    const expenses: ExpenseTypes.IExpense[] = await Expense
      .find({ category })
      .populate({ path: 'category', select: '-user' })
      .select('-user')

    return expenses
  }
}

export default new ExpenseRepository()
