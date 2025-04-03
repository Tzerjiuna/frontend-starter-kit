import { absoluteUrl } from '@/lib/utils'

/**
 * Enhanced fetch function with better error handling
 * Works as a drop-in replacement for fetch
 */
export async function apiFetch(url: string, options?: RequestInit): Promise<Response> {
  try {
    // Determine if this is an internal or external API call
    const requestUrl = url.startsWith('/api') ? url : absoluteUrl(url)
    return fetch(requestUrl, options)
  } catch (error) {
    // Create a standard error response
    return new Response(
      JSON.stringify({
        error: {
          message: (error as Error).message || 'Unknown error occurred'
        }
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
