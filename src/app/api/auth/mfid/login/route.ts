import { nanoid } from 'nanoid'
import { NextRequest } from 'next/server'

import { getSession } from '@/actions/session'
import { buildMfidAuthUrl, buildRedirectUrl } from '@/lib/mfid'

export async function GET(req: NextRequest) {
  const state = nanoid()
  const nonce = nanoid()
  const redirectUrl = buildRedirectUrl(req.nextUrl.origin)

  const session = await getSession()
  session.state = state
  session.nonce = nonce
  session.redirectUrl = redirectUrl

  await session.save()

  return Response.redirect(buildMfidAuthUrl({ state, nonce, redirectUrl }))
}
