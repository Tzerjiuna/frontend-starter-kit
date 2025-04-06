import { logger } from '@/lib/logger'

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public errors?: Record<string, string[]> // Field-specific errors (optional)
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// Expected structure of API error responses
type ApiErrorPayload = {
  message?: string
  errors?: string | Record<string, string[]> // Can be general string or field errors
  meta?: {
    code?: string // Optional error code
  }
}

/**
 * Parses an error response (response.ok === false) and throws an ApiError.
 * This function is expected to always throw.
 * @param response The raw Response object.
 */
export async function parseErrorResponseAndThrow(response: Response): Promise<never> {
  const contentType = response.headers.get('content-type')
  let errorPayload: ApiErrorPayload = {}
  let errorMessage = response.statusText || 'An unexpected error occurred'

  try {
    if (contentType && contentType.includes('application/json')) {
      errorPayload = await response.json()
      // Use the 'errors' string as the primary message if available
      if (typeof errorPayload.errors === 'string') {
        errorMessage = errorPayload.errors
      } else if (errorPayload.message) {
        // Fallback to message field if errors is not a string
        errorMessage = errorPayload.message
      }
      // Prepend meta.code to the message if it exists
      if (errorPayload.meta?.code) {
        errorMessage = `[${errorPayload.meta.code}] ${errorMessage}`
      }
    } else {
      // Attempt to read text for non-JSON errors
      const textError = await response.text()
      if (textError) {
        errorMessage = textError
      }
    }
  } catch (e) {
    // Ignore parsing errors if the body is empty or not readable
    logger.warn(`Failed to parse error response body for ${response.url}`)
    // Keep default errorMessage based on statusText
  }

  logger.warn(`API Error (${response.status}): ${response.url} - ${errorMessage}`)

  // Create and throw ApiError. Pass undefined for field-specific errors
  // if the API returns a general error string.
  throw new ApiError(
    response.status,
    errorMessage,
    // Pass field errors only if errorPayload.errors is an object (Record<string, string[]>)
    typeof errorPayload.errors === 'object' && errorPayload.errors !== null ? errorPayload.errors : undefined
  )
}

/**
 * Catches errors during the request lifecycle and ensures an ApiError is thrown.
 * @param error The caught error.
 */
export function handleApiError(error: unknown): never {
  if (error instanceof ApiError) {
    logger.error('API Error:', {
      status: error.status,
      message: error.message,
      errors: error.errors
    })
    throw error
  }

  if (error instanceof Error) {
    logger.error('Unexpected error:', error)
    throw new ApiError(500, error.message)
  }

  logger.error('Unknown error:', error)
  throw new ApiError(500, 'An unexpected error occurred')
}
