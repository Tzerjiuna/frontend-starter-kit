import { NextRequest } from 'next/server'

import { logger } from '@/lib/logger'
import { initiateLogin } from '@/services/server/auth'

export async function GET(request: NextRequest): Promise<Response> {
  try {
    return await initiateLogin(request)
  } catch (error) {
    logger.error('Error initiating MFID login:', error)
    return new Response('Error initiating MFID login', { status: 500 })
  }
}
