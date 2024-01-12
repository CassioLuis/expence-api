import { UserSchemas, handleValidation } from '../../helpers/validations'

class ReqValidatorMiddleware {
  createUserValidation = handleValidation({ body: UserSchemas.Create })
  loginValidation = handleValidation({ body: UserSchemas.Login })
}

export default new ReqValidatorMiddleware()
