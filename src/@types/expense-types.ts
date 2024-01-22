import { type Schema } from 'mongoose'

export interface IExpense {
  id?: Schema.Types.ObjectId | undefined
  date: string
  description: string
  category: string
  expenseValue: number
  creditCard?: boolean | undefined
  quota?: number | undefined
  totalQuota?: number | undefined
  user?: Schema.Types.ObjectId | undefined
}

export interface IDeletePayload {
  userId: Schema.Types.ObjectId
  expenseId: Schema.Types.ObjectId
}

export type TFilterQuery =
'id' | 'date' | 'description' | 'category' |
'expenseValue' | 'creditCard' | 'quota' | 'totalQuota' | 'user'
