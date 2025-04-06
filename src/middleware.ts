import acceptLanguage from 'accept-language'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

import { cookieName, fallbackLng, languages } from './i18n/settings'
import { sessionService } from '@/services/core/session'

acceptLanguage.languages(languages)

// Define NextMiddleware type
export type NextMiddleware = (req: NextRequest, evt: NextFetchEvent) => Promise<NextResponse | undefined>

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
}

export function middleware(req: NextRequest, evt: NextFetchEvent) {
  return chainMiddleware([LngMiddleware, AuthMiddleware])(req, evt)
}

export function chainMiddleware(middlewares: NextMiddleware[]): NextMiddleware {
  return async (req: NextRequest, evt: NextFetchEvent) => {
    for (const middleware of middlewares) {
      const response = await middleware(req, evt)
      if (response) {
        return response
      }
    }

    return NextResponse.next()
  }
}

function LngMiddleware(req: NextRequest): Promise<NextResponse | undefined> {
  return new Promise(resolve => {
    let lng: string | undefined | null
    if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName)?.value)
    if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'))
    if (!lng) lng = fallbackLng

    // Redirect if lng in path is not supported
    if (
      !languages.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
      !req.nextUrl.pathname.startsWith('/_next')
    ) {
      const response = NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url))
      response.cookies.set(cookieName, lng)
      resolve(response)
    }

    resolve(undefined)
  })
}

// Define public routes that don't require authentication
const publicPaths = ['/user/login']
const lngPublicPaths = languages.flatMap(lng => publicPaths.map(path => `/${lng}${path}`))

/**
 * Auth middleware that handles authentication checks
 */
async function AuthMiddleware(req: NextRequest): Promise<NextResponse | undefined> {
  const path = req.nextUrl.pathname
  const session = await sessionService.getSession()

  // Handle authenticated users trying to access login page
  if (lngPublicPaths.includes(path) && session.accessToken) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // Handle unauthenticated users trying to access protected routes
  if (!lngPublicPaths.includes(path) && !session.accessToken) {
    const loginUrl = new URL(`/user/login`, req.url)
    loginUrl.searchParams.set('redirect', path)
    return NextResponse.redirect(loginUrl)
  }

  return undefined
}
