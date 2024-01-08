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

const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()])

type Literal = z.infer<typeof literalSchema>
type Json = Literal | { [key: string]: Json } | Json[]

export const jsonSchema: z.ZodType<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)])
)
