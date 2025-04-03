import { NextRequest, NextResponse } from 'next/server'

import { getSession } from '@/actions/session'
import { MfidTokenRequest } from '@/api/auth/queries'
import { logger } from '@/lib/logger'
import { IMfidTokenResponse } from '@/lib/mocks/mock-data/auth'

export async function GET(req: NextRequest) {
  const state = req.nextUrl.searchParams.get('state') as string
  const code = req.nextUrl.searchParams.get('code') as string
  const session = await getSession()

  const loginUrl = new URL(`${req.nextUrl.origin}/user/login`)
  if (!code || !state || state !== session.state) {
    return NextResponse.redirect(loginUrl)
  }

  const payload: MfidTokenRequest = {
    code,
    nonce: session.nonce || '',
    redirect_uri: session.redirectUrl || ''
  }

  try {
    const res = await fetch(`${req.nextUrl.origin}/api/auth/mfid/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (res.status === 201) {
      const data = (await res.json()) as IMfidTokenResponse
      session.accessToken = data.access_token
      session.refreshToken = data.refresh_token
      await session.save()

      const homeUrl = new URL(req.nextUrl.origin)
      return NextResponse.redirect(homeUrl)
    }
  } catch (error) {
    logger.error('Error fetching MFID token:', error)
  }

  return NextResponse.redirect(loginUrl)
}

export const dynamic = 'force-dynamic'
