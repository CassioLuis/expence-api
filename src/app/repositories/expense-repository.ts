import { CategoryTypes, type ExpenseTypes } from '../../@types'
import mongodb from '../../infra/database/mongodb'
import Expense from '../../infra/database/mongodb/models/expense-model'

class ExpenseRepository {
  async save (expense: ExpenseTypes.IExpense): Promise<void> {
    await Expense.create(expense)
  }

  async update (expense: ExpenseTypes.IExpenseUpdate, expenseId: ExpenseTypes.IExpense['_id']): Promise<ExpenseTypes.IExpense | null> {
    return await Expense.findByIdAndUpdate(expenseId, expense, {
      returnDocument: 'after',
      select: '-user'
    })
  }

  async delete (expenseId: ExpenseTypes.IExpense['_id']): Promise<void> {
    await Expense.findByIdAndDelete(expenseId)
  }

  async getAll (): Promise<ExpenseTypes.IExpense[]> {
    const expenses: ExpenseTypes.IExpense[] = await Expense
      .find()
      .sort({ creationDate: -1 })
      .lean()

    return expenses
  }

  async getByUser (userId: ExpenseTypes.IExpense['_id']): Promise<ExpenseTypes.IExpense[] | undefined> {
    const expenses: ExpenseTypes.IExpense[] = await Expense
      .find({ user: userId })
      .populate({ path: 'category', select: '-user' })
      .select('-user')
      .sort({ creationDate: -1 })
      .lean()

    return expenses
  }

  async getById (id: ExpenseTypes.IExpense['_id'] | string | number): Promise<ExpenseTypes.IExpense[] | undefined> {
    const expense: ExpenseTypes.IExpense[] = await Expense
      .find({ _id: id })
      .populate({ path: 'category', select: '-user' })
      .select('-user')
      .sort({ creationDate: -1 })
      .lean()

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
      .sort({ creationDate: -1 })
      .lean()

    return expenses
  }

  async getByCategory (category: CategoryTypes.ICategory['id']): Promise<ExpenseTypes.IExpense[]> {
    const expenses: ExpenseTypes.IExpense[] = await Expense
      .find({ category })
      .populate({ path: 'category', select: '-user' })
      .select('-user')
      .sort({ creationDate: -1 })
      .lean()

    return expenses
  }

  async updateManyByDescriptionAndCategory (
    userId: string,
    description: string,
    fromCategoryId: string,
    toCategoryId: string
  ): Promise<number> {
    const result = await Expense.updateMany(
      {
        user: userId,
        description: { $regex: new RegExp(`^${description.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') },
        category: fromCategoryId
      },
      { $set: { category: toCategoryId } }
    )
    return result.modifiedCount
  }

  async findOneByDescriptionWithCategory (
    userId: string,
    description: string,
    excludeCategoryId: string
  ): Promise<ExpenseTypes.IExpense | null> {
    const expense = await Expense.findOne({
      user: userId,
      description: { $regex: new RegExp(`^${description.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') },
      category: { $ne: excludeCategoryId }
    }).lean()
    return expense as ExpenseTypes.IExpense | null
  }
}

export default new ExpenseRepository()
