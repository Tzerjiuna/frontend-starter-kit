/**
 * API Configuration System
 *
 * This file provides centralized control over API mocking behavior.
 * It allows for both global and per-endpoint configuration.
 */

// Define all API endpoints that can be individually configured
export type ApiEndpoint =
  | 'mfid-auth' // MFID authentication
  | 'users' // User data
  | 'posts' // Post data
// Add other API endpoints as needed

// Configuration interface
export interface ApiConfig {
  // Global mock switch - default behavior for all endpoints
  useMockApi: boolean

  // Per-endpoint overrides
  endpoints: Record<
    ApiEndpoint,
    {
      useMockApi?: boolean // Override the global setting for specific endpoints
    }
  >
}

/**
 * Gets the current API configuration based on environment and settings
 */
export const getApiConfig = (): ApiConfig => {
  // Default to mock in development, real in production
  const defaultUseMockApi = process.env.NODE_ENV === 'development'

  // Allow environment variable to override the default
  const globalUseMockApi =
    process.env.NEXT_PUBLIC_USE_MOCK_API === 'true'
      ? true
      : process.env.NEXT_PUBLIC_USE_MOCK_API === 'false'
        ? false
        : defaultUseMockApi

  return {
    useMockApi: globalUseMockApi,
    endpoints: {
      // Override specific endpoints if needed
      'mfid-auth': {
        // Allow specific override for MFID auth from env var
        useMockApi:
          process.env.NEXT_PUBLIC_MOCK_MFID_AUTH === 'true'
            ? true
            : process.env.NEXT_PUBLIC_MOCK_MFID_AUTH === 'false'
              ? false
              : undefined // undefined means "use the global setting"
      },
      users: {},
      posts: {}
      // Add other endpoints with their default configurations
    }
  }
}

/**
 * Helper function to check if a specific endpoint should use mock API
 *
 * @param endpoint The API endpoint to check
 * @returns boolean indicating if mock API should be used
 */
export const shouldUseMockApi = (endpoint: ApiEndpoint): boolean => {
  const config = getApiConfig()
  const endpointConfig = config.endpoints[endpoint]

  // Use endpoint-specific setting if defined, otherwise fall back to global setting
  if (endpointConfig?.useMockApi !== undefined) {
    return endpointConfig.useMockApi
  }

  return config.useMockApi
}
