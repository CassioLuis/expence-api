import { CategoryTypes, UserTypes, type ExpenseTypes } from '../../@types'
import validId from '../../helpers/utils/valid-objectid'
import { categoryRepository, expenseRepository } from '../repositories'

interface IError {
  status: number
  message: string
}

class CategoryService {
  public readonly errorMessages: Record<string, IError> = {
    categoryNotFound: {
      status: 404,
      message: 'Category not found'
    },
    invalidId: {
      status: 400,
      message: 'Invalid id'
    },
    notingToUpdate: {
      status: 400,
      message: 'Noting to update'
    },
    categoryAlreadyExists: {
      status: 400,
      message: 'Category already exists'
    }
  }

  async create (category: CategoryTypes.ICategory): Promise<void> {
    let { name, subCategory, user } = category
    const categories = await categoryRepository.getByUser(user)
    const categoriesNames = categories?.map((category: CategoryTypes.ICategory) => category.name.toLowerCase())
    if (categoriesNames?.includes(name.toLowerCase())) throw new Error('categoryAlreadyExists')
    if (!subCategory) {
      subCategory = 'Indefinido'
    }
    await categoryRepository.save({ name, subCategory, user })
  }

  async update (
    category: CategoryTypes.ICategory,
    categoryId: CategoryTypes.ICategory['id']
  ): Promise<CategoryTypes.ICategory | null | Error> {
    if (!validId(categoryId)) throw new Error('invalidId')
    if (Object.keys(category).length === 1) throw new Error('notingToUpdate')
    return await categoryRepository.update(category, categoryId)
  }

  async delete (deletePayload: CategoryTypes.IDeletePayload): Promise<void> {
    if (!validId(deletePayload.categoryId)) throw new Error('invalidId')

    const categories = await categoryRepository.getByUser(deletePayload.userId)
    if (!categories?.length) throw new Error('categoryNotFound')

    const [categoryToDelete] = categories.filter(category => category.id === deletePayload.categoryId)
    if (!categoryToDelete) throw new Error('categoryNotFound')

    const expenseWithThisCategory = await expenseRepository.getByCategory(deletePayload.categoryId)
    const defaultCategory = '65b80f618adc2566b1a22ad8'

    expenseWithThisCategory.forEach(async (expense) => {
      await expenseRepository.update({ category: defaultCategory }, expense.id)
    })

    await categoryRepository.delete(categoryToDelete.id)
  }

  async getByUser (userId: UserTypes.IUser['id']): Promise<CategoryTypes.ICategory[] | undefined> {
    const categories = await categoryRepository.getByUser(userId)
    if (!categories?.length) throw new Error('categoryNotFound')
    return categories
  }
}

export default new CategoryService()
