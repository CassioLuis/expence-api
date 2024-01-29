import { z } from 'zod'

import { CategoryTypes } from '../../@types'

export const Create: z.ZodType<CategoryTypes.ICategory> = z.object({
  name: z.string().min(3).max(20),
  subCategory: z.string().max(20).optional(),
})
