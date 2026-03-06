/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import multer from 'multer'

import importCsvController from '../../../app/controllers/import-csv-controller'
import { authMiddleware } from '../../../app/middlewares'

const importCsvRouter = Router()
const upload = multer({ storage: multer.memoryStorage() })

// POST /expenses/import
importCsvRouter.post('/expenses/import',
  upload.single('file'),
  authMiddleware.tokenValidation,
  importCsvController.upload.bind(importCsvController)
)

export default importCsvRouter
