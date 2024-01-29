import { z } from 'zod'

import { type ExpenseTypes } from '../../@types'

export const Create: z.ZodType<ExpenseTypes.IExpense> = z.object({
  expenseDate: z.string().datetime(),
  description: z.string().min(2).max(20),
  category: z.string().min(3).max(24),
  expenseValue: z.number().positive(),
  creditCard: z.boolean().optional(),
  quota: z.number().optional(),
  totalQuota: z.number().optional()
})

export const Update: z.ZodType<ExpenseTypes.IExpenseUpdate> = z.object({
  expenseDate: z.string().datetime().optional(),
  description: z.string().min(2).max(20).optional(),
  category: z.string().min(3).max(24).optional(),
  expenseValue: z.number().positive().optional(),
  creditCard: z.boolean().optional(),
  quota: z.number().optional(),
  totalQuota: z.number().optional()
})
