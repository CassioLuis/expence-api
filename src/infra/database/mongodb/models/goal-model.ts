import mongoose from 'mongoose'

const { Schema } = mongoose

const GoalSchema = new Schema({
  categoryName: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    default: 0
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

const Goal = mongoose.model('Goal', GoalSchema)

export default Goal
