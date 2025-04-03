import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { logger } from './logger'

// Export re-exports from specific utility modules
export * from './utils/form-utils'
export * from './utils/string-utils'

/**
 * Utility function to conditionally join class names with Tailwind support
 *
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Create an absolute URL from a relative path
 *
 * @param path - Relative path
 * @returns Absolute URL
 */
export function absoluteUrl(path: string) {
  // Add debugging
  logger.debug(`absoluteUrl called with path: ${path}`)

  // Check if the path is already a fully qualified URL
  if (path.startsWith('http')) {
    logger.debug(`Path is already absolute: ${path}`)
    return path
  }

  // If the path starts with /api, we're calling our internal API
  // This should not happen anymore as it's handled in makeApiRequest
  if (path.startsWith('/api')) {
    logger.warn('Internal API path passed to absoluteUrl, this should be handled by makeApiRequest')
    return path
  }

  // For external API calls, use the configured base URL
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  if (!apiBaseUrl) {
    logger.error('NEXT_PUBLIC_API_BASE_URL is not defined')
    throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined')
  }

  // Ensure proper URL construction by handling trailing slashes
  const normalizedBaseUrl = apiBaseUrl.endsWith('/') ? apiBaseUrl.slice(0, -1) : apiBaseUrl
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const fullUrl = `${normalizedBaseUrl}${normalizedPath}`
  logger.debug(`External API path transformed to: ${fullUrl}`)
  return fullUrl
}

/**
 * Wait for a specified number of milliseconds
 *
 * @param ms - Milliseconds to wait
 * @returns Promise that resolves after delay
 */
export function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Check if the code is running on the server side
 *
 * @returns True if running on server
 */
export function isServer(): boolean {
  return typeof window === 'undefined'
}

/**
 * Check if the code is running on the client side
 *
 * @returns True if running on client
 */
export function isClient(): boolean {
  return !isServer()
}

/**
 * Parse a string to JSON with error handling
 *
 * @param jsonString - JSON string to parse
 * @param fallback - Fallback value if parsing fails
 * @returns Parsed JSON or fallback
 */
export function parseJSON<T>(jsonString: string, fallback: T): T {
  try {
    return JSON.parse(jsonString) as T
  } catch (error) {
    return fallback
  }
}

/**
 * Updates a URL search parameter with a new value
 *
 * @param type - Parameter name to update
 * @param value - New value for the parameter
 * @returns New pathname with updated search parameter
 */
export const updateSearchParams = (type: string, value: string) => {
  // Get the current URL search params
  const searchParams = new URLSearchParams(window.location.search)

  // Set the specified search parameter to the given value
  searchParams.set(type, value)

  // Set the specified search parameter to the given value
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`

  return newPathname
}

/**
 * Deletes a URL search parameter
 *
 * @param type - Parameter name to delete
 * @returns New pathname without the deleted search parameter
 */
export const deleteSearchParams = (type: string) => {
  // Set the specified search parameter to the given value
  const newSearchParams = new URLSearchParams(window.location.search)

  // Delete the specified search parameter
  newSearchParams.delete(type.toLocaleLowerCase())

  // Construct the updated URL pathname with the deleted search parameter
  const newPathname = `${window.location.pathname}?${newSearchParams.toString()}`

  return newPathname
}
