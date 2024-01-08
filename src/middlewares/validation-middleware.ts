import { handleValidation } from '../helpers/validations/handle-validation'
import { UserSchema } from '../helpers/validations/zod-schemas'

class ValidationMiddleware {
  createUserValidation = handleValidation({ body: UserSchema })
}

export default new ValidationMiddleware()
