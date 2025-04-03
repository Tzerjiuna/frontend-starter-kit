import { MfidTokenRequest } from '@/api/auth/queries'
import { shouldUseMockApi } from '@/config/api-config'
import { IMfidTokenResponse, createMockMfidTokenResponse } from '@/lib/mocks/mock-data/auth'

// Flag to enable/disable auth mocking
/**
 * Flag to determine if auth-related API endpoints should use mock data
 * Uses the centralized mock configuration system from api-config.ts
 */
export const useMocks = shouldUseMockApi('mfid-auth')

// Define response types for better type safety
interface MfidTokenResponse {
  success: boolean
  data: IMfidTokenResponse
}

/**
 * Mock handlers for auth-related endpoints
 */
export const authMockHandlers = {
  /**
   * Handle POST /auth/mfid/token
   */
  getMfidToken: (body: MfidTokenRequest): MfidTokenResponse => {
    // Simulate validation of request
    if (!body || !body.code) {
      throw new Error('Invalid token request')
    }

    return {
      success: true,
      data: createMockMfidTokenResponse()
    }
  }
}
