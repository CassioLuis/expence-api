import mongoose from 'mongoose'

const { Schema } = mongoose

const CategoriesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  subCategory: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

const Category = mongoose.model('Category', CategoriesSchema)

export default Category