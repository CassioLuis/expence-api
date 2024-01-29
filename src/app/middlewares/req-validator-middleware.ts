import {
  CategorySchemas,
  ExpenseSchemas,
  UserSchemas,
  handleValidation
} from '../../helpers/validations'

class ReqValidatorMiddleware {
  createUserValidation = handleValidation({ body: UserSchemas.Create })
  loginValidation = handleValidation({ body: UserSchemas.Login })
  emailValidation = handleValidation({ body: UserSchemas.Email })
  createExpenseValidation = handleValidation({ body: ExpenseSchemas.Create })
  updateExpenseValidation = handleValidation({ body: ExpenseSchemas.Update })
  createCategoryValidation = handleValidation({ body: CategorySchemas.Create })
}

export default new ReqValidatorMiddleware()
