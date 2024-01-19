import { z } from 'zod'

import { type AuthTypes, type UserTypes } from '../../@types'
import { userRepository } from '../../app/repositories'

export const Create: z.ZodType<UserTypes.IUser> = z.object({
  name: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email().refine(
    async (email) => {
      const user = await userRepository.get({ email })
      return !user.length
    },
    { message: 'This e-mail is already in use' }
  ),
  password: z.string().min(6)
})

export const Login: z.ZodType<AuthTypes.ILogin> = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export const Email = z.object({
  email: z.string().email().refine(
    async (email) => {
      const user = await userRepository.get({ email })
      return user.length
    },
    { message: 'User not found' }
  )
})
