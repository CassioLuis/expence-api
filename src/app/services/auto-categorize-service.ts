import { expenseRepository } from '../repositories'

const DEFAULT_CATEGORY_ID = '65b80f618adc2566b1a22ad8'

class AutoCategorizeService {

  /**
   * After a category is set on an expense, propagate that category
   * to all other expenses from the same user with the same description
   * that still have the default ("Indefinido") category.
   */
  async propagateCategory (
    userId: string,
    description: string,
    newCategoryId: string
  ): Promise<number> {
    if (newCategoryId === DEFAULT_CATEGORY_ID) return 0

    const updatedCount = await expenseRepository.updateManyByDescriptionAndCategory(
      userId,
      description,
      DEFAULT_CATEGORY_ID,
      newCategoryId
    )
    return updatedCount
  }

  /**
   * Given a description, check if there's already a categorized expense
   * (not default) with the same description for this user.
   * Returns the found category ID, or the defaultCategoryId if none found.
   */
  async resolveCategory (
    userId: string,
    description: string,
    defaultCategoryId: string
  ): Promise<string> {
    const existing = await expenseRepository.findOneByDescriptionWithCategory(
      userId,
      description,
      defaultCategoryId
    )

    if (existing && existing.category) {
      // category could be a populated object or an ObjectId
      const categoryId = typeof existing.category === 'object' && (existing.category as any)._id
        ? (existing.category as any)._id.toString()
        : existing.category.toString()
      return categoryId
    }

    return defaultCategoryId
  }
}

export default new AutoCategorizeService()
