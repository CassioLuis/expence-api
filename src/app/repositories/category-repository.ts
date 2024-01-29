import { CategoryTypes, UserTypes } from '../../@types'
import mongodb from '../../infra/database/mongodb'
import Category from '../../infra/database/mongodb/models/category-model'

class categoryRepository {
  async save (category: CategoryTypes.ICategory): Promise<void> {
    await Category.create(category)
  }

  async update (
    category: CategoryTypes.ICategory,
    categoryId: CategoryTypes.ICategory['id']
  ): Promise<CategoryTypes.ICategory | null> {
    return await Category.findByIdAndUpdate(categoryId, category, {
      returnDocument: 'after',
      select: '-user'
    })
  }

  async delete (categoryId: CategoryTypes.ICategory['id']): Promise<void> {
    await Category.findByIdAndDelete(categoryId)
  }

  async getByUser (userId: UserTypes.IUser['id']): Promise<CategoryTypes.ICategory[] | undefined> {
    const categorys: CategoryTypes.ICategory[] = await Category.find({ user: userId })
    return categorys
  }
}

export default new categoryRepository()
