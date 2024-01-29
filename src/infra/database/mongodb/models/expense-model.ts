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
    type: Schema.Types.ObjectId,
    ref: 'Category',
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
    type: Number,
    default: 1
  },
  totalQuota: {
    type: Number,
    default: 1
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
})

const Expense = mongoose.model('Expense', ExpenseSchema)

export default Expense
