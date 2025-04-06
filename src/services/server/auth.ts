import { nanoid } from 'nanoid'
import { NextRequest } from 'next/server'

import { sessionService } from '../core/session'
import { logger } from '@/lib/logger'
import { absoluteUrl } from '@/lib/utils'

export interface IMfidTokenRequest {
  grant_type: string
  code: string
  nonce: string
  redirect_uri: string
}

export interface IMfidTokenResponse {
  access_token: string
  refresh_token: string
}

const MFID_BASE_URL = process.env.NEXT_PUBLIC_MFID_BASE_URL
const MFID_TOKEN_ENDPOINT = '/auth/mfid/token'
const MFID_CLIENT_ID = process.env.NEXT_PUBLIC_MFID_CLIENT_ID
const MFID_CLIENT_SECRET = process.env.NEXT_PUBLIC_MFID_CLIENT_SECRET
const MFID_AUTH_ENDPOINT = '/oauth/authorize'
const MFID_SCOPE = 'openid email'
const MFID_RESPONSE_TYPE = 'code'
const MFID_PROMPT = 'select_account'

/**
 * Builds the MFID authentication URL with required parameters
 * @param params Object containing state, nonce, redirectUrl, and optional loginHint
 * @returns The fully constructed MFID authentication URL
 */
export function buildMfidAuthUrl(params: {
  state: string
  nonce: string
  redirectUrl: string
  loginHint?: string
}): string {
  if (!MFID_BASE_URL || !MFID_CLIENT_ID) {
    throw new Error('MFID configuration missing')
  }

  const url = new URL(`${MFID_BASE_URL}${MFID_AUTH_ENDPOINT}`)
  url.searchParams.append('client_id', MFID_CLIENT_ID)
  url.searchParams.append('response_type', MFID_RESPONSE_TYPE)
  url.searchParams.append('scope', MFID_SCOPE)
  url.searchParams.append('state', params.state)
  url.searchParams.append('nonce', params.nonce)
  url.searchParams.append('redirect_uri', params.redirectUrl)

  if (params.loginHint) {
    url.searchParams.append('login_hint', params.loginHint)
  } else {
    url.searchParams.append('prompt', MFID_PROMPT)
  }

  return url.toString()
}

/**
 * Initiates the login process by creating state and nonce values,
 * storing them in the session, and redirecting to the MFID authentication URL
 * @param req The Next.js request object
 * @returns A redirect response to the MFID authentication URL
 */
export async function initiateLogin(req: NextRequest): Promise<Response> {
  const state = nanoid()
  const nonce = nanoid()
  const redirectUrl = `${req.nextUrl.origin}/api/auth/mfid/callback`

  try {
    const session = await sessionService.getSession()
    session.state = state
    session.nonce = nonce
    session.redirectUrl = redirectUrl
    await session.save()

    const authUrl = buildMfidAuthUrl({ state, nonce, redirectUrl })
    return Response.redirect(authUrl)
  } catch (error) {
    logger.error('Login initiation failed:', error)
    return Response.redirect(`${process.env.NEXT_PUBLIC_APP_URL || ''}/user/login`)
  }
}

/**
 * Handle the callback from MFID after authentication
 */
export async function handleCallback(req: NextRequest): Promise<Response> {
  const loginUrl = new URL(`${req.nextUrl.origin}/user/login`)

  try {
    const session = await sessionService.getSession()
    const { searchParams } = new URL(req.url)
    const code = searchParams.get('code')
    const state = searchParams.get('state')

    const storedState = session.state
    const storedNonce = session.nonce

    if (!code || !state || state !== storedState) {
      return Response.redirect(loginUrl)
    }

    const token = await exchangeCodeForToken({
      code,
      nonce: storedNonce || '',
      redirectUrl: session.redirectUrl || ''
    })

    session.accessToken = token.access_token
    session.refreshToken = token.refresh_token
    await session.save()

    const homeUrl = new URL('/', req.url)
    return Response.redirect(homeUrl)
  } catch (error) {
    logger.error('Callback request failed:', error)
    return Response.redirect(loginUrl)
  }
}

/**
 * Exchange the authorization code for an access token
 */
export async function exchangeCodeForToken(request: {
  code: string
  nonce: string
  redirectUrl: string
}): Promise<IMfidTokenResponse> {
  try {
    if (!MFID_BASE_URL || !MFID_CLIENT_ID || !MFID_CLIENT_SECRET) {
      throw new Error('MFID configuration missing')
    }

    const authHeader = 'Basic ' + Buffer.from(`${MFID_CLIENT_ID}:${MFID_CLIENT_SECRET}`).toString('base64')
    const payload: IMfidTokenRequest = {
      grant_type: 'authorization_code',
      code: request.code,
      nonce: request.nonce,
      redirect_uri: request.redirectUrl
    }

    const response = await fetch(absoluteUrl(MFID_TOKEN_ENDPOINT), {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error('Failed to exchange code for token')
    }

    return await response.json()
  } catch (error) {
    logger.error('Error getting MFID token:', error)
    throw error
  }
}

/**
 * Log the user out
 */
export async function logout() {
  try {
    const session = await sessionService.getSession()
    session.destroy()
    return true
  } catch (error) {
    logger.error('Error logging out:', error)
    return false
  }
}
