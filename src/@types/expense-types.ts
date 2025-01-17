import { type Schema } from 'mongoose'
import { CategoryTypes, ExpenseTypes, UserTypes } from '.'

export interface IExpense {
  _id?: Schema.Types.ObjectId
  expenseDate: string
  description: string
  category: CategoryTypes.ICategory['id']
  expenseValue: number
  creditCard?: boolean | undefined
  quota?: number | undefined
  totalQuota?: number | undefined
  user?: UserTypes.IUser['id']
}

export interface IDeletePayload {
  userId: UserTypes.IUser['id']
  expenseId: string
}

export interface IAnalitic {
  category: IExpense['category']
  value: number
}

export interface IExpenseUpdate {
  expenseDate?: string
  description?: string
  category?: string
  expenseValue?: number
  creditCard?: boolean | undefined
  quota?: number | undefined
  totalQuota?: number | undefined
  user?: IExpense['_id']
}
