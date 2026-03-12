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

  async upsertGoals (userId: string, goal: GoalTypes.IGoal): Promise<GoalTypes.IGoal | false> {
    const updated = await goalRepository.upsertGoal(userId, goal)
    return updated || false
  }
}

export default new GoalService()
