import { absoluteUrl } from '@/lib/utils'

/**
 * Types for API responses
 */
export type ApiErrorType = {
  status: number
  message: string
  errors?: Record<string, string[]>
}

export type ApiResponseType<T> = {
  data: T
  meta?: Record<string, unknown>
}

const defaultHeaders = {
  'Content-Type': 'application/json'
}

/**
 * Base configuration for fetch requests
 */
const baseConfig = (headers: HeadersInit = {}): RequestInit => ({
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'include',
  headers: {
    ...defaultHeaders,
    ...headers
  }
})

/**
 * Type for the request body
 */
type RequestBody = Record<string, unknown> | unknown[] | string | null

/**
 * Handle API response with proper error handling
 */
async function handleResponse<T>(response: Response): Promise<ApiResponseType<T>> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    const apiError: ApiErrorType = {
      status: response.status,
      message: errorData.message || response.statusText || 'An error occurred',
      errors: errorData.errors
    }
    throw apiError
  }

  const contentType = response.headers.get('content-type')

  // Handle different response types
  if (contentType && contentType.includes('application/json')) {
    const json = await response.json()
    return json as ApiResponseType<T>
  } else if (contentType && contentType.includes('text/')) {
    const text = await response.text()
    return { data: text as unknown as T }
  } else {
    const blob = await response.blob()
    return { data: blob as unknown as T }
  }
}

/**
 * HTTP Client with built-in error handling and type inference
 * Used for client-side data fetching (SWR, React Query, etc.)
 */
export const httpClient = {
  /**
   * GET request
   */
  get: async <T>(path: string, headers?: HeadersInit): Promise<ApiResponseType<T>> => {
    const response = await fetch(absoluteUrl(path), {
      ...baseConfig(headers),
      method: 'GET'
    })

    return handleResponse<T>(response)
  },

  /**
   * POST request
   */
  post: async <T>(path: string, body?: RequestBody, headers?: HeadersInit): Promise<ApiResponseType<T>> => {
    const response = await fetch(absoluteUrl(path), {
      ...baseConfig(headers),
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined
    })

    return handleResponse<T>(response)
  },

  /**
   * PUT request
   */
  put: async <T>(path: string, body?: RequestBody, headers?: HeadersInit): Promise<ApiResponseType<T>> => {
    const response = await fetch(absoluteUrl(path), {
      ...baseConfig(headers),
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined
    })

    return handleResponse<T>(response)
  },

  /**
   * PATCH request
   */
  patch: async <T>(path: string, body?: RequestBody, headers?: HeadersInit): Promise<ApiResponseType<T>> => {
    const response = await fetch(absoluteUrl(path), {
      ...baseConfig(headers),
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined
    })

    return handleResponse<T>(response)
  },

  /**
   * DELETE request
   */
  delete: async <T>(path: string, headers?: HeadersInit): Promise<ApiResponseType<T>> => {
    const response = await fetch(absoluteUrl(path), {
      ...baseConfig(headers),
      method: 'DELETE'
    })

    return handleResponse<T>(response)
  }
}
