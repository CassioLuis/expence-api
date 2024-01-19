import {
  ExpenseSchemas,
  UserSchemas,
  handleValidation
} from '../../helpers/validations'

class ReqValidatorMiddleware {
  createUserValidation = handleValidation({ body: UserSchemas.Create })
  loginValidation = handleValidation({ body: UserSchemas.Login })
  emailValidation = handleValidation({ body: UserSchemas.Email })
  createExpenseValidation = handleValidation({ body: ExpenseSchemas.Create })
}

export default new ReqValidatorMiddleware()
