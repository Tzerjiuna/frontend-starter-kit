/**
 * Mock data for authentication-related endpoints
 */

export interface IMfidTokenResponse {
  token_type: string
  access_token: string
  refresh_token: string
  id_token: string
  expires_in: number
  scope: string
}

/**
 * Generates a random token for mocking purposes
 */
function generateRandomToken(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substring(2)}-${Date.now().toString(36)}`
}

/**
 * Creates a mock MFID token response
 */
export function createMockMfidTokenResponse(): IMfidTokenResponse {
  return {
    token_type: 'Bearer',
    access_token: generateRandomToken('mock-access'),
    refresh_token: generateRandomToken('mock-refresh'),
    id_token: generateRandomToken('mock-id'),
    expires_in: 3600,
    scope: 'openid profile email'
  }
}
