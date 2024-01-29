import { type Request, type Response } from 'express'

import { CategoryTypes, UserTypes } from '../../@types'
import { categoryService } from '../services'

class CategoryController {
  errorHandler ({ message }: any, res: Response): void {
    const error = categoryService.errorMessages[message]
    if (error) {
      res.status(error.status).json({ message: error.message })
      return
    }
    res.sendStatus(500)
  }

  async create (req: Request, res: Response): Promise<void> {
    try {
      await categoryService.create(req.body as CategoryTypes.ICategory)
      res.sendStatus(201)
    } catch (error: any) {
      this.errorHandler(error, res)
    }
  }

  async delete (req: Request, res: Response): Promise<void> {
    try {
      const deletePayload: CategoryTypes.IDeletePayload = {
        userId: req.body.user,
        categoryId: req.params.categoryId as unknown as CategoryTypes.ICategory['id']
      }
      await categoryService.delete(deletePayload)
      res.sendStatus(204)
    } catch (error: any) {
      this.errorHandler(error, res)
    }
  }

  async getAllByUser (req: Request, res: Response): Promise<void> {
    try {
      const { user } = req.body
      const expenses = await categoryService.getByUser(user as unknown as UserTypes.IUser['id'])
      res.status(200).json(expenses)
    } catch (error: any) {
      this.errorHandler(error, res)
    }
  }

  async update (req: Request, res: Response): Promise<void> {
    try {
      const { categoryId } = req.params
      const response = await categoryService.update(
        req.body as CategoryTypes.ICategory,
        categoryId as unknown as CategoryTypes.ICategory['id']
      )
      res.status(200).json(response)
    } catch (error: any) {
      this.errorHandler(error, res)
    }
  }
}

export default new CategoryController()
