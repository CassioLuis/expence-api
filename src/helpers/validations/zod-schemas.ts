import { z } from 'zod'

import { UserRepository } from '../../repositories'
import { type IUser } from '../../types/user-types'

export const UserSchema: z.ZodType<IUser> = z.object({
  name: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email().refine(isMailInUse, { message: 'This e-mail is already in use' }),
  password: z.string().min(6)
})

async function isMailInUse (email: string): Promise<boolean> {
  const response: object[] | [] = await UserRepository.get({ email })
  if (!response.length) return true
  return false
}
