import { HttpResponse, http } from 'msw'

// Define a realistic mock response for the token endpoint
const mockTokenResponse = {
  access_token: 'mock-access-token-12345',
  refresh_token: 'mock-refresh-token-67890',
  expires_in: 3600, // Example: 1 hour
  token_type: 'Bearer',
  scope: 'openid profile email', // Example scopes
}

export const authHandlers = [
  http.post('*/auth/mfid/token', async () => {
    return HttpResponse.json(mockTokenResponse)
  }),
] 
