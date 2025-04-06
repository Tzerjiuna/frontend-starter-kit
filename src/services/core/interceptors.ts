import { logger } from '@/lib/logger'

export interface RequestInterceptor {
  onRequest?: (request: Request) => Promise<Request> | Request
  onResponse?: (response: Response) => Promise<Response> | Response
  onError?: (error: unknown) => Promise<never> | never
}

export const defaultInterceptors: RequestInterceptor[] = [
  {
    onRequest: async request => {
      logger.debug(`Making ${request.method} request to ${request.url}`)
      return request
    },
    onResponse: async response => {
      logger.debug(`Received ${response.status} from ${response.url}`)
      return response
    },
    onError: async error => {
      logger.error('Request failed:', error)
      throw error
    }
  }
]

export async function applyInterceptors(
  request: Request,
  interceptors: RequestInterceptor[] = defaultInterceptors
): Promise<Response> {
  let modifiedRequest = request

  // Apply request interceptors
  for (const interceptor of interceptors) {
    if (interceptor.onRequest) {
      modifiedRequest = await interceptor.onRequest(modifiedRequest)
    }
  }

  try {
    let response = await fetch(modifiedRequest)

    // Apply response interceptors
    for (const interceptor of interceptors) {
      if (interceptor.onResponse) {
        response = await interceptor.onResponse(response)
      }
    }

    return response
  } catch (error) {
    // Apply error interceptors
    for (const interceptor of interceptors) {
      if (interceptor.onError) {
        return interceptor.onError(error)
      }
    }
    throw error
  }
}
