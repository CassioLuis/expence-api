import { type ExpenseTypes } from '../../@types'
import Expense from '../../infra/database/mongodb/models/expense-model'
import { IBankParser, ParsedExpense, SkippedItem } from './parsers/bank-parser'
import nubankParser from './parsers/nubank-parser'
import autoCategorizeService from './auto-categorize-service'

interface DuplicateItem {
  description: string
  expenseDate: string
  expenseValue: number
  quota: number
  totalQuota: number
  reason: string
}

interface ImportResult {
  imported: number
  skipped: {
    count: number
    items: SkippedItem[]
  }
  duplicates: {
    count: number
    items: DuplicateItem[]
  }
}

interface IError {
  status: number
  message: string
}

const VALUE_TOLERANCE = 0.10

class ImportCsvService {
  public readonly errorMessages: Record<string, IError> = {
    invalidBankType: {
      status: 400,
      message: 'Invalid bank type. Supported: nubank'
    },
    emptyFile: {
      status: 400,
      message: 'CSV file is empty or invalid'
    },
    importFailed: {
      status: 500,
      message: 'Failed to import CSV'
    }
  }

  private readonly parsers: Record<string, IBankParser> = {
    nubank: nubankParser
  }

  async importFromCsv (
    fileBuffer: Buffer,
    userId: string,
    defaultCategoryId: string,
    bankType: string = 'nubank'
  ): Promise<ImportResult> {
    const parser = this.parsers[bankType]
    if (!parser) throw new Error('invalidBankType')

    const csvContent = fileBuffer.toString('utf-8')
    const { parsed: parsedExpenses, skipped: skippedItems } = parser.parse(csvContent)

    if (parsedExpenses.length === 0) throw new Error('emptyFile')

    // Generate all expenses including future installments
    const allExpenses = this.generateInstallments(parsedExpenses, userId, defaultCategoryId)

    // Deduplicate against existing expenses
    const { toInsert, duplicateItems } = await this.deduplicate(allExpenses, userId)

    // Auto-categorize: resolve categories based on existing categorized expenses
    const resolvedCategories = new Map<string, string>()
    for (const expense of toInsert) {
      const descLower = expense.description.toLowerCase()
      if (!resolvedCategories.has(descLower)) {
        const resolved = await autoCategorizeService.resolveCategory(
          userId,
          expense.description,
          defaultCategoryId
        )
        resolvedCategories.set(descLower, resolved)
      }
      const resolvedCat = resolvedCategories.get(descLower)!
      if (resolvedCat !== defaultCategoryId) {
        expense.category = resolvedCat as any
      }
    }

    // Bulk insert
    if (toInsert.length > 0) {
      await Expense.insertMany(toInsert)
    }

    // Propagate resolved categories to any remaining uncategorized expenses
    for (const [desc, categoryId] of resolvedCategories) {
      if (categoryId !== defaultCategoryId) {
        await autoCategorizeService.propagateCategory(userId, desc, categoryId)
      }
    }

    return {
      imported: toInsert.length,
      skipped: {
        count: skippedItems.length,
        items: skippedItems
      },
      duplicates: {
        count: duplicateItems.length,
        items: duplicateItems
      }
    }
  }

  /**
   * Generate remaining installments from the current quota onward.
   * E.g. if CSV has Parcela 2/3, inserts quota 2 and generates quota 3.
   * If CSV has Parcela 1/3, inserts quota 1, generates quota 2 and 3.
   */
  private generateInstallments (
    parsedExpenses: ParsedExpense[],
    userId: string,
    defaultCategoryId: string
  ): ExpenseTypes.IExpense[] {
    const allExpenses: ExpenseTypes.IExpense[] = []

    for (const expense of parsedExpenses) {
      if (expense.totalQuota > 1) {
        // Insert the current quota and generate the remaining ones
        for (let i = 0; i <= expense.totalQuota - expense.quota; i++) {
          const quota = expense.quota + i
          let expenseDate = expense.expenseDate

          if (i > 0) {
            const baseDate = new Date(expense.expenseDate)
            baseDate.setDate(1)
            baseDate.setMonth(baseDate.getMonth() + i)
            expenseDate = baseDate.toISOString()
          }

          allExpenses.push({
            expenseDate,
            description: expense.description,
            category: defaultCategoryId as any,
            expenseValue: expense.expenseValue,
            creditCard: expense.creditCard,
            quota,
            totalQuota: expense.totalQuota,
            user: userId as any
          })
        }
      } else {
        allExpenses.push({
          expenseDate: expense.expenseDate,
          description: expense.description,
          category: defaultCategoryId as any,
          expenseValue: expense.expenseValue,
          creditCard: expense.creditCard,
          quota: 1,
          totalQuota: 1,
          user: userId as any
        })
      }
    }

    return allExpenses
  }

  /**
   * Deduplicate by matching: description (case-insensitive) + quota + totalQuota + value (±tolerance)
   */
  private async deduplicate (
    expenses: ExpenseTypes.IExpense[],
    userId: string
  ): Promise<{ toInsert: ExpenseTypes.IExpense[], duplicateItems: DuplicateItem[] }> {
    // Get all existing expenses for the user
    const existingExpenses: ExpenseTypes.IExpense[] = await Expense
      .find({ user: userId })
      .select('description quota totalQuota expenseValue expenseDate')
      .lean()

    const toInsert: ExpenseTypes.IExpense[] = []
    const duplicateItems: DuplicateItem[] = []
    for (const expense of expenses) {
      const isDuplicate = existingExpenses.some(existing => {
        const descMatch = existing.description.toLowerCase() === expense.description.toLowerCase()
        const quotaMatch = existing.quota === expense.quota
        const totalQuotaMatch = existing.totalQuota === expense.totalQuota
        const valueMatch = Math.abs(existing.expenseValue - expense.expenseValue) <= VALUE_TOLERANCE
        const monthMatch = existing.expenseDate.substring(5, 7) === expense.expenseDate.substring(5, 7)
        return descMatch && quotaMatch && totalQuotaMatch && valueMatch && monthMatch
      })

      if (isDuplicate) {
        duplicateItems.push({
          description: expense.description,
          expenseDate: expense.expenseDate,
          expenseValue: expense.expenseValue,
          quota: expense.quota!,
          totalQuota: expense.totalQuota!,
          reason: `Já existe despesa com mesma descrição, parcela ${expense.quota}/${expense.totalQuota} e valor similar`
        })
      } else {
        toInsert.push(expense)
      }
    }

    return { toInsert, duplicateItems }
  }
}

export default new ImportCsvService()
