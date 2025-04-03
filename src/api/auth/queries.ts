import { logger } from '@/lib/logger'
import { authMockHandlers, useMocks } from '@/lib/mocks/auth'
import { IMfidTokenResponse } from '@/lib/mocks/mock-data/auth'

export interface MfidTokenRequest {
  code: string
  nonce: string
  redirect_uri: string
}

/**
 * Get a MFID token using the provided authorization code
 * This function automatically uses mock data if mocking is enabled via the centralized mock configuration
 *
 * @param request The token request data
 * @returns The token response or undefined if an error occurs
 */
export async function getMfidToken(request: MfidTokenRequest): Promise<IMfidTokenResponse | undefined> {
  try {
    if (useMocks) {
      try {
        const mockResponse = authMockHandlers.getMfidToken(request)
        if (mockResponse && mockResponse.success) {
          await new Promise(resolve => setTimeout(resolve, 300))
          return mockResponse.data
        }
      } catch (mockError) {
        logger.error('Error in mock MFID token handler:', mockError)
        throw mockError
      }
    }

    const authHeader =
      'Basic ' +
      Buffer.from(`${process.env.NEXT_PUBLIC_MFID_CLIENT_ID}:${process.env.NEXT_PUBLIC_MFID_CLIENT_SECRET}`).toString(
        'base64'
      )

    if (!process.env.NEXT_PUBLIC_MFID_BASE_URL) {
      throw new Error('MFID base URL not configured')
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_MFID_BASE_URL}/oauth/token`, {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: request.code,
        nonce: request.nonce,
        redirect_uri: request.redirect_uri
      })
    })

    if (!response.ok) {
      throw new Error(`MFID API returned status ${response.status}`)
    }

    return (await response.json()) as IMfidTokenResponse
  } catch (error) {
    logger.error('Error getting MFID token:', error)
    return undefined
  }
}
