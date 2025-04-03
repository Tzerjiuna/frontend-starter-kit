import { StatusCodes } from 'http-status-codes'
import { NextRequest, NextResponse } from 'next/server'

import { MfidTokenRequest, getMfidToken } from '@/api/auth/queries'
import { logger } from '@/lib/logger'

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as MfidTokenRequest

    // Get the token using our centralized function that handles mocking
    const tokenResponse = await getMfidToken(body)

    if (!tokenResponse) {
      return NextResponse.json({ error: 'MFID authentication failed' }, { status: StatusCodes.UNAUTHORIZED })
    }

    return NextResponse.json(tokenResponse, { status: StatusCodes.CREATED })
  } catch (error) {
    logger.error('Error processing token request:', error)
    return NextResponse.json(
      { error: 'Failed to process token request' },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    )
  }
}

export const dynamic = 'force-dynamic'
