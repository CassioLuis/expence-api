import mongoose from 'mongoose'

import { CategoryTypes, type ExpenseTypes } from '../../@types'
import { categoryRepository, expenseRepository } from '../repositories'
import validId from '../../helpers/utils/valid-objectid'

interface IError {
  status: number
  message: string
}

// interface IAnalitic {
//   category: string
//   value: number
// }

class ExpenseService {
  public readonly errorMessages: Record<string, IError> = {
    expenseNotFound: {
      status: 404,
      message: 'Expense not found'
    },
    invalidId: {
      status: 400,
      message: 'Invalid id'
    },
    notingToUpdate: {
      status: 400,
      message: 'Noting to update'
    },
    invalidCategory: {
      status: 400,
      message: 'Category not found'
    }
  }

  async create (expense: ExpenseTypes.IExpense): Promise<void> {
    const { user, category } = expense
    const categories = await categoryRepository.getByUser(user)
    const categoriesId = categories?.map((category: CategoryTypes.ICategory) => category.id)
    if (!categoriesId?.includes(category)) throw new Error('invalidCategory')

    await expenseRepository.save(expense)
  }

  async update (expense: ExpenseTypes.IExpenseUpdate, expenseId: ExpenseTypes.IExpense['id']): Promise<ExpenseTypes.IExpense | null | Error> {
    if (!validId(expenseId)) throw new Error('invalidId')
    if (Object.keys(expense).length === 1) throw new Error('notingToUpdate')
    return await expenseRepository.update(expense, expenseId)
  }

  async delete (deletePayload: ExpenseTypes.IDeletePayload): Promise<void> {
    if (!validId(deletePayload.expenseId)) throw new Error('invalidId')
    const expenses = await expenseRepository.getByUser(deletePayload.userId)
    if (!expenses?.length) throw new Error('expenseNotFound')
    const [expenseToDelete] = expenses.filter(expense => expense.id === deletePayload.expenseId)
    if (!expenseToDelete) throw new Error('expenseNotFound')
    await expenseRepository.delete(expenseToDelete.id)
  }

  async getByUser (userId: ExpenseTypes.IExpense['user']): Promise<ExpenseTypes.IExpense[] | undefined> {
    const expenses = await expenseRepository.getByUser(userId)
    if (!expenses?.length) throw new Error('expenseNotFound')
    return expenses
  }

  async getById (id: string): Promise<ExpenseTypes.IExpense[] | undefined> {
    if (!validId(id)) throw new Error('invalidId')
    const expense = await expenseRepository.getById(id)
    if (!expense?.length) throw new Error('expenseNotFound')
    return expense
  }

  async getByDateInterval (userId: string, iniDate: string, finDate: string): Promise<any> {
    const expenses = await expenseRepository.getByDateInterval(userId, iniDate, finDate)
    if (!expenses?.length) throw new Error('expenseNotFound')

    const analitic: ExpenseTypes.IAnalitic[] = expenses?.reduce(
      (acc: ExpenseTypes.IAnalitic[], item: ExpenseTypes.IExpense): ExpenseTypes.IAnalitic[] => {
        const existingCategory = acc.find((el: any) => el.category === item.category)
        if (existingCategory) {
          existingCategory.value += item.expenseValue
        } else {
          acc.push({ category: item.category, value: item.expenseValue })
        }
        return acc
      }, []
    )

    const relevanceBalance = analitic.reduce((acc: any, item: any): any => {
      const subCategory = item.category.subCategory || 'Indefinido'
      acc[subCategory] = acc[subCategory] ?? item.value
      return acc
    }, {})

    return { relevanceBalance, analitic, expenses }
  }
}

export default new ExpenseService()
