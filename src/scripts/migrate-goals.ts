import MongoDb from '../infra/database/mongodb'
import Goal from '../infra/database/mongodb/models/goal-model'
import Category from '../infra/database/mongodb/models/category-model'

async function migrate () {
  try {
    // Assuming environment variables are loaded via --env-file flag
    await MongoDb.connect()
    console.log('Connected to MongoDB')

    const goalsWithoutCategory = await Goal.find({ category: { $exists: false } })
    console.log(`Found ${goalsWithoutCategory.length} goals to migrate`)

    for (const goal of goalsWithoutCategory) {
      // Use lowercase for case-insensitive matching as per user request
      const category = await Category.findOne({
        user: goal.user,
        name: { $regex: new RegExp(`^${goal.categoryName}$`, 'i') }
      })
      if (category) {
        await Goal.updateOne({ _id: goal._id }, { category: category._id })
        console.log(`Updated goal "${goal.categoryName}" for user ${goal.user} with category ID ${category._id}`)
      } else {
        console.warn(`Category not found for goal "${goal.categoryName}" and user ${goal.user}`)
      }
    }

    console.log('Migration finished successfully')
  } catch (error) {
    console.error('Migration failed:', error)
  } finally {
    await MongoDb.disconnect()
    process.exit(0)
  }
}

migrate()
