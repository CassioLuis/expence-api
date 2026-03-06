export interface ParsedExpense {
  expenseDate: string
  description: string
  expenseValue: number
  quota: number
  totalQuota: number
  creditCard: boolean
}

export interface SkippedItem {
  description: string
  expenseDate: string
  expenseValue: number
  reason: string
}

export interface ParseResult {
  parsed: ParsedExpense[]
  skipped: SkippedItem[]
}

export interface IBankParser {
  parse (csvContent: string): ParseResult
}
