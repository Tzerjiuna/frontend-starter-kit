import { ApiError, handleApiError, parseErrorResponseAndThrow } from './error-handler'
import { applyInterceptors } from './interceptors'
import { logger } from '@/lib/logger'
import { absoluteUrl } from '@/lib/utils'
import { IResult } from '@/types/result'

type RequestBody = Record<string, unknown> | unknown[] | string | null

const defaultHeaders: HeadersInit = {
  'Content-Type': 'application/json'
}

/**
 * Common config options shared by all requests
 */
const getBaseConfig = (method: string, headers: HeadersInit = {}, body?: unknown): RequestInit => {
  return {
    method,
    headers: {
      ...defaultHeaders,
      ...headers
    },
    // Only stringify if body is a plain object or array
    body:
      typeof body === 'object' && body !== null && !(body instanceof Blob) && !(body instanceof FormData)
        ? JSON.stringify(body)
        : (body as BodyInit)
  }
}

/**
 * Get client-side specific config for requests
 */
const getClientConfig = (method: string, headers: HeadersInit = {}, body?: unknown): RequestInit => {
  return {
    ...getBaseConfig(method, headers, body),
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include' // Ensures cookies (including session token) are sent
  }
}

/**
 * Get server-side specific config for requests.
 */
const getServerConfig = (method: string, headers: HeadersInit = {}, body?: unknown): RequestInit => {
  return getBaseConfig(method, headers, body)
}

/**
 * Handle API response, parsing successful JSON or delegating error handling.
 * Ensures the final return type is always IResult<T>.
 */
async function handleResponse<T>(response: Response): Promise<IResult<T>> {
  if (!response.ok) {
    await parseErrorResponseAndThrow(response)
    throw new Error('parseErrorResponseAndThrow failed to throw an error')
  }

  const contentType = response.headers.get('content-type')

  if ((contentType && contentType.includes('application/json')) || (!contentType && response.ok)) {
    try {
      const result = await response.json()

      // Ensure IResult structure
      if (typeof result === 'object' && result !== null && 'data' in result) {
        return result as IResult<T>
      } else {
        logger.debug(`API response for ${response.url} did not have IResult structure. Wrapping raw data.`)
        return { data: result as T }
      }
    } catch (parseError) {
      logger.error(
        `Failed to parse supposedly successful response body as JSON for ${response.url} (Content-Type: ${contentType}).`,
        parseError
      )
      throw new Error(`Failed to parse API response body for ${response.url}`)
    }
  } else {
    logger.error(`Unexpected content type for successful response: ${contentType} from ${response.url}`)
    throw new Error(`Unsupported content type: Expected application/json for ${response.url}, received ${contentType}`)
  }
}

/**
 * Generic request function for client-side requests
 */
async function clientRequest<T>(
  method: string,
  path: string,
  body?: RequestBody,
  headers?: HeadersInit
): Promise<IResult<T>> {
  try {
    const config = getClientConfig(method, headers, body)
    const request = new Request(absoluteUrl(path), config)
    logger.debug(`Client API ${method} request to: ${request.url}`)
    const response = await applyInterceptors(request)
    return handleResponse<T>(response)
  } catch (error) {
    return handleApiError(error)
  }
}

/**
 * Generic request function for server-side requests
 */
async function serverRequest<T>(
  method: string,
  path: string,
  body?: RequestBody,
  headers?: HeadersInit
): Promise<IResult<T>> {
  const url = absoluteUrl(path)
  logger.debug(`Server API ${method} request to: ${url}`)

  try {
    const config = getServerConfig(method, headers, body)
    const request = new Request(url, config)
    const response = await fetch(request)
    return handleResponse<T>(response)
  } catch (error) {
    logger.error(`Server API ${method} error for ${path}:`, error)
    if (!(error instanceof ApiError)) {
      throw new Error(
        `Network or setup error during server request to ${url}: ${error instanceof Error ? error.message : String(error)}`
      )
    }
    throw error
  }
}

/**
 * Unified API service for both client-side and server-side API calls
 */
export const api = {
  client: {
    get: <T>(path: string, headers?: HeadersInit): Promise<IResult<T>> =>
      clientRequest<T>('GET', path, undefined, headers),

    post: <T>(path: string, body?: RequestBody, headers?: HeadersInit): Promise<IResult<T>> =>
      clientRequest<T>('POST', path, body, headers),

    put: <T>(path: string, body?: RequestBody, headers?: HeadersInit): Promise<IResult<T>> =>
      clientRequest<T>('PUT', path, body, headers),

    patch: <T>(path: string, body?: RequestBody, headers?: HeadersInit): Promise<IResult<T>> =>
      clientRequest<T>('PATCH', path, body, headers),

    delete: <T>(path: string, headers?: HeadersInit): Promise<IResult<T>> =>
      clientRequest<T>('DELETE', path, undefined, headers)
  },

  server: {
    get: <T>(path: string, headers?: HeadersInit): Promise<IResult<T>> =>
      serverRequest<T>('GET', path, undefined, headers),

    post: <T>(path: string, body?: RequestBody, headers?: HeadersInit): Promise<IResult<T>> =>
      serverRequest<T>('POST', path, body, headers),

    put: <T>(path: string, body?: RequestBody, headers?: HeadersInit): Promise<IResult<T>> =>
      serverRequest<T>('PUT', path, body, headers),

    delete: <T>(path: string, headers?: HeadersInit): Promise<IResult<T>> =>
      serverRequest<T>('DELETE', path, undefined, headers),

    patch: <T>(path: string, body?: RequestBody, headers?: HeadersInit): Promise<IResult<T>> =>
      serverRequest<T>('PATCH', path, body, headers)
  }
}
