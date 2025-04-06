import { logger } from './lib/logger'

export async function register() {
  // Only apply MSW in development mode for the Node.js runtime
  if (process.env.APP_ENV === 'development' && process.env.NEXT_RUNTIME === 'nodejs') {
    // Check the environment variable flag to enable mocking
    if (process.env.NEXT_PUBLIC_API_MOCKING === 'true') {
      logger.info('🚀 Initializing MSW for Node.js (NEXT_PUBLIC_API_MOCKING is true)')
      // Dynamically import MSW server only when needed
      const { server } = await import('./mocks/node')
      server.listen()
      logger.info('✅ MSW for Node.js initialized')
    } else {
      logger.info("🟡 MSW for Node.js is disabled (NEXT_PUBLIC_API_MOCKING is not 'true')")
    }
  }
}
