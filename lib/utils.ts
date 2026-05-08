import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a number as GBP. UK retail conventions:
 *  - whole pounds → no decimals    (e.g. 289   → "£289")
 *  - any pence    → exactly 2 dp   (e.g. 2.4   → "£2.40", 6.5 → "£6.50", 12.99 → "£12.99")
 *  - thousands separator from en-GB (£1,289)
 *
 * Why we don't just use `toLocaleString('en-GB')`: that drops trailing zeros,
 * so 2.40 displays as "£2.4" — looks broken to a UK customer.
 */
export function formatGBP(amount: number): string {
  const isWhole = Number.isInteger(amount)
  return `£${amount.toLocaleString('en-GB', {
    minimumFractionDigits: isWhole ? 0 : 2,
    maximumFractionDigits: isWhole ? 0 : 2,
  })}`
}
