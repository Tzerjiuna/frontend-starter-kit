import { NextRequest } from 'next/server'

import { logger } from '@/lib/logger'
import { handleCallback } from '@/services/server/auth'

export async function GET(request: NextRequest): Promise<Response> {
  try {
    return await handleCallback(request)
  } catch (error) {
    logger.error('Error handling MFID callback:', error)
    return new Response('Error handling MFID callback', { status: 500 })
  }
}
