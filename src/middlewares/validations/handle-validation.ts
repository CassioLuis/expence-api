import { type RequestHandler } from 'express'
import { type ZodError, type ZodSchema } from 'zod'

type TProperty = 'body' | 'header' | 'params' | 'query'
type TAllSchemas = Record<TProperty, ZodSchema>
type TValidation = (schemas: Partial<TAllSchemas>) => RequestHandler

export const handleValidation: TValidation = (schemas) => async function (req, res, next) {
  const totalErrors: Record<string, Record<string, string>> = {}

  for (const [key, schema] of Object.entries(schemas)) {
    try {
      await schema.parseAsync(req[key as TProperty])
    } catch (error) {
      const zodError = error as ZodError
      const errors: Record<string, string> = {}

      for (const error of zodError.errors) {
        errors[error.path.join('/')] = error.message
      }

      totalErrors[key] = errors
    }
  }

  if (Object.keys(totalErrors).length === 0) { next(); return }
  res.status(400).json(totalErrors)
}
