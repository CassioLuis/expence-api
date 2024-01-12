import { z } from 'zod'

import { type UserTypes } from '../../@types'
import { UserRepository } from '../../app/repositories'

export const Create: z.ZodType<UserTypes.IUser> = z.object({
  name: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email().refine(isInUseEmail, { message: 'This e-mail is already in use' }),
  password: z.string().min(6)
})

export const Login: z.ZodType<UserTypes.ILogin> = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

async function isInUseEmail (email: UserTypes.ILogin['email']): Promise<boolean> {
  const response: object[] | [] = await UserRepository.get('email', email)
  if (!response.length) return true
  return false
}
