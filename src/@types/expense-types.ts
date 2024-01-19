export interface IExpense {
  date: string
  description: string
  category: string
  expenseValue: number
  creditCard?: boolean | undefined
  quota?: number | undefined
  totalQuota?: number | undefined
}
