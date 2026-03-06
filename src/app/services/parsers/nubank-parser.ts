import { IBankParser, ParsedExpense, ParseResult, SkippedItem } from './bank-parser'

class NubankParser implements IBankParser {
  /**
   * Parses Nubank CSV content into ParsedExpense objects.
   * 
   * CSV format: date,title,amount
   * Installments detected via "- Parcela X/Y" suffix in title.
   * Negative amounts (payments received) are skipped.
   * 
   * Nubank billing cycle: dates up to day 2 of the next month belong to the
   * current cycle. These are adjusted to the last day of the dominant month.
   */
  parse (csvContent: string): ParseResult {
    const lines = csvContent.trim().split('\n')
    const dataLines = lines.slice(1) // Skip header

    const skipped: SkippedItem[] = []
    const installmentRegex = /\s*-\s*Parcela\s+(\d+)\/(\d+)$/i

    // First pass: collect all dates to determine the dominant month
    const monthCount: Record<string, number> = {}
    const rawRows: Array<{ date: string, title: string, amount: number }> = []

    for (const line of dataLines) {
      const trimmed = line.trim()
      if (!trimmed) continue

      const firstComma = trimmed.indexOf(',')
      const lastComma = trimmed.lastIndexOf(',')
      if (firstComma === -1 || lastComma === firstComma) continue

      const date = trimmed.substring(0, firstComma).trim()
      const title = trimmed.substring(firstComma + 1, lastComma).trim()
      const amountStr = trimmed.substring(lastComma + 1).trim()
      const amount = parseFloat(amountStr)

      if (isNaN(amount)) continue

      // Extract YYYY-MM for month counting
      const yearMonth = date.substring(0, 7) // "2025-11"
      monthCount[yearMonth] = (monthCount[yearMonth] || 0) + 1

      rawRows.push({ date, title, amount })
    }

    // Determine dominant month (the one with most entries)
    const dominantYearMonth = Object.entries(monthCount)
      .sort((a, b) => b[1] - a[1])[0]?.[0] // e.g. "2025-11"

    // Calculate last day of the dominant month
    let lastDayOfDominantMonth: string | null = null
    if (dominantYearMonth) {
      const [year, month] = dominantYearMonth.split('-').map(Number)
      const lastDay = new Date(year, month, 0).getDate() // day 0 of next month = last day of current
      lastDayOfDominantMonth = `${dominantYearMonth}-${String(lastDay).padStart(2, '0')}`
    }

    // Second pass: parse rows with date adjustment
    const parsed: ParsedExpense[] = []

    for (const row of rawRows) {
      const { date, title, amount } = row

      if (amount < 0) {
        skipped.push({
          description: title,
          expenseDate: date,
          expenseValue: amount,
          reason: 'Pagamento recebido (valor negativo)'
        })
        continue
      }

      // Adjust date: if it's in a different month than dominant,
      // move it to the last day of the dominant month
      let adjustedDate = date
      const rowYearMonth = date.substring(0, 7)

      if (dominantYearMonth && rowYearMonth !== dominantYearMonth && lastDayOfDominantMonth) {
        adjustedDate = lastDayOfDominantMonth
      }

      let description = title
      let quota = 1
      let totalQuota = 1

      const match = title.match(installmentRegex)
      if (match) {
        quota = parseInt(match[1], 10)
        totalQuota = parseInt(match[2], 10)
        description = title.replace(installmentRegex, '').trim()
      }

      const expenseDate = new Date(`${adjustedDate}T12:00:00.000`).toISOString()

      parsed.push({
        expenseDate,
        description,
        expenseValue: amount,
        quota,
        totalQuota,
        creditCard: true
      })
    }

    return { parsed, skipped }
  }
}

export default new NubankParser()
