import mongoose from 'mongoose'
import toPascalCase from '../../../../helpers/utils/to-pascal-case'

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

CategoriesSchema.pre('save', function (next) {
  this.name = toPascalCase(this.name)
  this.subCategory = toPascalCase(this.subCategory ?? '')
  next()
})

const Category = mongoose.model('Category', CategoriesSchema)

export default Category