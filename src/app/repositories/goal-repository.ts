import { GoalTypes, UserTypes } from '../../@types'
import Goal from '../../infra/database/mongodb/models/goal-model'

class goalRepository {
  async save (goal: GoalTypes.IGoal): Promise<void> {
    await Goal.create(goal)
  }

  async update (
    goal: GoalTypes.IGoal,
    goalId: GoalTypes.IGoal['id']
  ): Promise<GoalTypes.IGoal | null> {
    return await Goal.findByIdAndUpdate(goalId, goal, {
      returnDocument: 'after',
      select: '-user'
    })
  }

  async upsertGoal (userId: string, categoryName: string, amount: number): Promise<GoalTypes.IGoal | null> {
    return await Goal.findOneAndUpdate(
      { user: userId, categoryName },
      { amount },
      { upsert: true, new: true, returnDocument: 'after' }
    )
  }

  async getByUser (userId: UserTypes.IUser['id']): Promise<GoalTypes.IGoal[] | undefined> {
    const goals: GoalTypes.IGoal[] = await Goal.find({ user: userId }).select('-user')
    return goals
  }
}

export default new goalRepository()
