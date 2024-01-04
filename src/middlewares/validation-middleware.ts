import { handleValidation } from './validations/handle-validation'
import { UserSchema } from './validations/zod-schemas'

export const validationMiddleware = {
  createUserValidation: handleValidation({ body: UserSchema })
}
