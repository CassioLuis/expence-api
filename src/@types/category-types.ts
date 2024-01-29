import { Schema } from 'mongoose'
import { CategoryTypes, UserTypes } from '.'

export interface ICategory {
  id?: Schema.Types.ObjectId | undefined | string
  name: string
  subCategory?: string
  user?: Schema.Types.ObjectId,
}

export interface IDeletePayload {
  userId: UserTypes.IUser['id']
  categoryId: CategoryTypes.ICategory['id']
}