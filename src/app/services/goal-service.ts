import { GoalTypes, UserTypes } from '../../@types'
import { goalRepository } from '../repositories'

class GoalService {
  public errorMessages: Record<string, { status: number, message: string }> = {
    // We can add custom errors later if needed
  }

  async getByUser (userId: UserTypes.IUser['id']): Promise<GoalTypes.IGoal[]> {
    const goals = await goalRepository.getByUser(userId)
    return goals || []
  }

  async upsertGoals (userId: string, goals: { categoryName: string, amount: number }[]): Promise<GoalTypes.IGoal[]> {
    const updatedGoals: GoalTypes.IGoal[] = []

    for (const goal of goals) {
      const updated = await goalRepository.upsertGoal(userId, goal.categoryName, goal.amount)
      if (updated) updatedGoals.push(updated)
    }

    return updatedGoals
  }
}

export default new GoalService()
