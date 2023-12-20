import crypto, { Hash } from 'crypto'
import mongoose from 'mongoose'

const { Schema } = mongoose

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  }
})

UserSchema.pre('save', function (next) {
  this.password = crypto.createHash(this.password, 10)
  next()
})
const User = mongoose.model('User', UserSchema)

export default User
