'use server'

import { revalidatePath } from 'next/cache'

import { apiFetch } from '@/lib/api/fetch-wrapper'

/**
 * Type for the response from server actions
 */
export type ServerActionResponse<T> = {
  data?: T
  error?: {
    status: number
    message: string
    errors?: Record<string, string[]>
  }
  success: boolean
}

/**
 * Type for API request body
 */
type ApiRequestBody = Record<string, unknown> | unknown[] | string | null

/**
 * Base headers for API requests
 */
const baseHeaders = {
  'Content-Type': 'application/json'
}

/**
 * Generic function to make API requests from server actions
 */
async function makeApiRequest<T>(
  url: string,
  method: string,
  body?: ApiRequestBody,
  headers?: HeadersInit
): Promise<ServerActionResponse<T>> {
  try {
    // Use our mocking-enabled fetch wrapper
    const response = await apiFetch(url, {
      method,
      headers: {
        ...baseHeaders,
        ...headers
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: 'no-store'
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return {
        success: false,
        error: {
          status: response.status,
          message: errorData.message || response.statusText || 'An error occurred',
          errors: errorData.errors
        }
      }
    }

    const contentType = response.headers.get('content-type')
    let data: unknown

    // Parse response based on content type
    if (contentType && contentType.includes('application/json')) {
      const json = await response.json()
      data = json.data || json
    } else if (contentType && contentType.includes('text/')) {
      data = await response.text()
    } else {
      data = await response.blob()
    }

    return {
      success: true,
      data: data as T
    }
  } catch (error) {
    return {
      success: false,
      error: {
        status: 500,
        message: (error as Error).message || 'Server error occurred'
      }
    }
  }
}

/**
 * Fetch data via GET with optional query parameters
 * Use for simple data fetching or with query string filters
 */
export async function getData<T>(
  path: string,
  params?: Record<string, string>,
  revalidate?: string
): Promise<ServerActionResponse<T>> {
  // Construct URL with query parameters if provided
  let url = path
  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value)
      }
    })
    const queryString = searchParams.toString()
    if (queryString) {
      url = `${path}?${queryString}`
    }
  }

  const result = await makeApiRequest<T>(url, 'GET')

  if (result.success && revalidate) {
    revalidatePath(revalidate)
  }

  return result
}

/**
 * Fetch data via POST with request body
 * Use for complex filtering, search, and pagination
 */
export async function searchData<T>(
  path: string,
  searchParams: Record<string, unknown>,
  revalidate?: string
): Promise<ServerActionResponse<T>> {
  const result = await makeApiRequest<T>(path, 'POST', searchParams, {
    'Content-Type': 'application/json'
  })

  if (result.success && revalidate) {
    revalidatePath(revalidate)
  }

  return result
}
