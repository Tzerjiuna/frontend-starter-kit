/**
 * Truncate a string with ellipsis if it's longer than maxLength
 *
 * @param str - The string to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated string
 */
export function truncate(str: string, maxLength: number): string {
  if (!str) return ''
  if (str.length <= maxLength) return str

  return str.slice(0, maxLength) + '...'
}

/**
 * Format a number as currency with optional locale and currency code
 *
 * @param value - Number to format
 * @param locale - Locale for formatting (default: 'en-US')
 * @param currency - Currency code (default: 'USD')
 * @returns Formatted currency string
 */
export function formatCurrency(value: number, locale = 'en-US', currency = 'USD'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(value)
}

/**
 * Capitalize the first letter of each word in a string
 *
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export function capitalizeWords(str: string): string {
  if (!str) return ''

  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

/**
 * Remove all HTML tags from a string
 *
 * @param html - HTML string
 * @returns Plain text without HTML tags
 */
export function stripHtml(html: string): string {
  if (!html) return ''

  return html.replace(/<\/?[^>]+(>|$)/g, '')
}

/**
 * Generate a URL-friendly slug from a string
 *
 * @param str - String to convert to slug
 * @returns URL-friendly slug
 */
export function slugify(str: string): string {
  if (!str) return ''

  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove consecutive hyphens
}

/**
 * Format a date string to a human-readable format
 *
 * @param dateString - ISO date string or Date object
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted date string
 */
export function formatDate(dateString: string | Date, locale = 'en-US'): string {
  try {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString

    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (error) {
    return ''
  }
}
