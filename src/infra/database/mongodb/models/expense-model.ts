import mongoose from 'mongoose'

const { Schema } = mongoose

const ExpenseSchema = new Schema({
  expenseDate: {
    type: String,
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  expenseValue: {
    type: Number,
    required: true
  },
  creditCard: {
    type: Boolean,
    default: true
  },
  quota: {
    type: String,
    default: 1
  },
  totalQuota: {
    type: String,
    default: 1
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

const Expense = mongoose.model('ExpenseSchema', ExpenseSchema)

export default Expense
