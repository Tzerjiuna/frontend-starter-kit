import { logger } from '@/lib/logger'

// Ensure logger path is correct

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

  // For internal API calls, use the configured base URL
  // Ensure this env var is available in the context where this runs (client/server)
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  if (!apiBaseUrl) {
    logger.error('NEXT_PUBLIC_API_BASE_URL is not defined')
    throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined')
  }

  // Ensure proper URL construction by handling trailing slashes
  const normalizedBaseUrl = apiBaseUrl.endsWith('/') ? apiBaseUrl.slice(0, -1) : apiBaseUrl
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const fullUrl = `${normalizedBaseUrl}${normalizedPath}`
  logger.debug(`Internal API path transformed to: ${fullUrl}`)
  return fullUrl
}

/**
 * Updates a URL search parameter with a new value (Client-side only)
 *
 * @param type - Parameter name to update
 * @param value - New value for the parameter
 * @returns New pathname with updated search parameter
 */
export const updateSearchParams = (type: string, value: string) => {
  // Ensure this runs only on the client
  if (typeof window === 'undefined') {
    logger.error('updateSearchParams called on the server.')
    return '' // Or throw error
  }
  // Get the current URL search params
  const searchParams = new URLSearchParams(window.location.search)

  // Set the specified search parameter to the given value
  searchParams.set(type, value)

  // Set the specified search parameter to the given value
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`

  return newPathname
}

/**
 * Deletes a URL search parameter (Client-side only)
 *
 * @param type - Parameter name to delete
 * @returns New pathname without the deleted search parameter
 */
export const deleteSearchParams = (type: string) => {
  // Ensure this runs only on the client
  if (typeof window === 'undefined') {
    logger.error('deleteSearchParams called on the server.')
    return '' // Or throw error
  }
  // Set the specified search parameter to the given value
  const newSearchParams = new URLSearchParams(window.location.search)

  // Delete the specified search parameter
  newSearchParams.delete(type.toLocaleLowerCase())

  // Construct the updated URL pathname with the deleted search parameter
  const newPathname = `${window.location.pathname}?${newSearchParams.toString()}`

  return newPathname
}
