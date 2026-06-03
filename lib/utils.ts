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

/**
 * Produce a clean SEO meta description from longer body copy.
 * Used so a page can keep its full on-page/schema description while the
 * <meta name="description"> stays within Google's ~160-char display window.
 *
 *  - Collapses whitespace.
 *  - If the text already fits, returns it unchanged.
 *  - Otherwise prefers the first complete sentence (when it fits and isn't too short).
 *  - Falls back to a word-boundary trim with an ellipsis — never cuts mid-word.
 */
export function toMetaDescription(text: string, max = 158): string {
  const clean = (text ?? '').replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean

  const firstSentence = clean.match(/^.*?[.!?](?=\s|$)/)?.[0]?.trim()
  if (firstSentence && firstSentence.length >= 60 && firstSentence.length <= max) {
    return firstSentence
  }

  const cut = clean.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trim()}…`
}
