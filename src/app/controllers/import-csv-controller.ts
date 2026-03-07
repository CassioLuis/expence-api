import { type Request, type Response } from 'express'

import importCsvService from '../services/import-csv-service'

const DEFAULT_CATEGORY_ID = '65b80f618adc2566b1a22ad8'

class ImportCsvController {
  errorHandler ({ message }: any, res: Response): void {
    const error = importCsvService.errorMessages[message]
    if (error) {
      res.status(error.status).json({ message: error.message })
      return
    }
    res.status(500).json({ message: 'Internal server error' })
  }

  async upload (req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({ message: 'No file uploaded. Send a CSV file in the "file" field.' })
        return
      }
      const { user } = req.body
      const bankType = (req.body.bankType as string) || 'nubank'
      const categoryId = (req.body.categoryId as string) || DEFAULT_CATEGORY_ID

      const result = await importCsvService.importFromCsv(
        req.file.buffer,
        user,
        categoryId,
        bankType
      )
      res.status(200).json(result)
    } catch (error: any) {
      this.errorHandler(error, res)
    }
  }
}

export default new ImportCsvController()
