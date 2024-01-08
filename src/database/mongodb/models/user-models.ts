import mongoose from 'mongoose'

import encodePassword from '../../../helpers/encode-password'

const { Schema } = mongoose

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastName: {
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
  this.password = encodePassword(this.password)
  next()
})

const User = mongoose.model('User', UserSchema)

export default User
