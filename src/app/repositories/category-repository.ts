import { CategoryTypes, UserTypes } from '../../@types'
import mongodb from '../../infra/database/mongodb'
import Category from '../../infra/database/mongodb/models/category-model'

class categoryRepository {
  async save (category: CategoryTypes.ICategory): Promise<void> {
    await mongodb.connect()
    try {
      await Category.create(category)
    } finally {
      await mongodb.disconnect()
    }
  }

  async update (
    category: CategoryTypes.ICategory,
    categoryId: CategoryTypes.ICategory['id']
  ): Promise<CategoryTypes.ICategory | null> {
    await mongodb.connect()
    try {
      return await Category.findByIdAndUpdate(categoryId, category, {
        returnDocument: 'after',
        select: '-user'
      })
    } finally {
      await mongodb.disconnect()
    }
  }

  async delete (categoryId: CategoryTypes.ICategory['id']): Promise<void> {
    await mongodb.connect()
    try {
      await Category.findByIdAndDelete(categoryId)
    } finally {
      await mongodb.disconnect()
    }
  }

  async getByUser (userId: UserTypes.IUser['id']): Promise<CategoryTypes.ICategory[] | undefined> {
    await mongodb.connect()
    try {
      const categorys: CategoryTypes.ICategory[] = await Category.find({ user: userId })
      return categorys
    } finally {
      await mongodb.disconnect()
    }
  }
}

export default new categoryRepository()
