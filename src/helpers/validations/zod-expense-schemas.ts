import { z } from 'zod'

import { type ExpenseTypes } from '../../@types'

export const Create: z.ZodType<ExpenseTypes.IExpense> = z.object({
  date: z.string(),
  description: z.string().min(2).max(20),
  category: z.string().min(3).max(20),
  expenseValue: z.number().positive(),
  creditCard: z.boolean().optional(),
  quota: z.number().optional(),
  totalQuota: z.number().optional()
})
