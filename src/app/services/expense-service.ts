import mongoose from 'mongoose'

import { type ExpenseTypes } from '../../@types'
import { expenseRepository } from '../repositories'

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
    }
  }

  async create (expense: ExpenseTypes.IExpense): Promise<void> {
    await expenseRepository.save(expense)
  }

  async delete (deletePayload: ExpenseTypes.IDeletePayload): Promise<void> {
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
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('invalidId')
    const expense = await expenseRepository.getById(id)
    if (!expense?.length) throw new Error('expenseNotFound')
    return expense
  }

  async getByDateInterval (userId: string, iniDate: string, finDate: string): Promise<any> {
    const expenses = await expenseRepository.getByDateInterval(userId, iniDate, finDate)
    if (!expenses?.length) throw new Error('expenseNotFound')

    // const analitic: any = expenses?.reduce((acc: Record<any, any>, item: any): any => {
    //   if (!acc[item.category]) {
    //     acc[item.category] = 0
    //   }
    //   acc[item.category] += item.expenseValue
    //   return acc
    // }, {})

    const analitic: any = expenses?.reduce((acc: Record<any, any>, item: any, index: any): any => {
      const existingCategory = acc[index].category === item.category
      // acc.find((el: any) => el.category === item.category)
      console.log(existingCategory)
      // if (existingCategory) {
      //   existingCategory += item.value
      // } else {
      //   acc.push({ category: item.category, value: item.value })
      // }
      return acc
    }, [])

    return { analitic, expenses }
  }
}

export default new ExpenseService()
