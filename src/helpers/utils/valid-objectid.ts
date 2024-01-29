import mongoose, { Schema } from 'mongoose'

export default function validId (id: string | Schema.Types.ObjectId | undefined) {
  return mongoose.Types.ObjectId.isValid(id as string)
}