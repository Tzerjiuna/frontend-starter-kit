import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Export re-exports from specific utility modules
export * from './utils/form-utils'
export * from './utils/string-utils'
export * from './utils/url-utils'

/**
 * Utility function to conditionally join class names with Tailwind support
 *
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
