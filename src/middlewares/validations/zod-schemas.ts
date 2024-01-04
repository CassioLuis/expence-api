import { z } from 'zod'

import { userRepository } from '../../repositories'
import { type IUser } from '../../types/user-types'

export const UserSchema: z.ZodType<IUser> = z.object({
  name: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email().refine(isMailInUse, { message: 'e-mail already in use' }),
  password: z.string().min(6)
})

async function isMailInUse (email: string): Promise<boolean> {
  const response: object[] | [] = await userRepository.get({ email })
  if (response.length === 0) return true
  return false
}
