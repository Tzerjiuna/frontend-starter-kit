import acceptLanguage from 'accept-language'
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from 'next/server'

import { getSession } from './actions/session'
import { cookieName, fallbackLng, languages } from './i18n/settings'

acceptLanguage.languages(languages)

export const config = {
  // matcher: '/:lng*'
  matcher: ['/((?!api|_next|.*\\..*).*)']
}

export function middleware(req: NextRequest, evt: NextFetchEvent) {
  return chainMiddleware([LngMiddleware, AuthMiddleware])(req, evt)
}

export function chainMiddleware(middlewares: NextMiddleware[]): NextMiddleware {
  return (req: NextRequest, evt: NextFetchEvent) => {
    for (const middleware of middlewares) {
      const response = middleware(req, evt)
      if (response) {
        return response
      }
    }

    return NextResponse.next()
  }
}

function LngMiddleware(req: NextRequest) {
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
    return response
  }

  return
}

// Define public paths that don't require authentication
const publicPaths = ['/user/login', '/logout']

// Create localized versions of the public paths
const lngPublicPaths = languages.flatMap(lng => publicPaths.map(path => `/${lng}${path}`))

async function AuthMiddleware(_req: NextRequest) {
  const session = await getSession()

  // If user is already logged in and trying to access public paths, redirect them to home page
  if (session.accessToken && lngPublicPaths.some(path => _req.nextUrl.pathname.startsWith(path))) {
    return NextResponse.redirect(new URL(`/${fallbackLng}`, _req.url))
  }

  // If not logged in and trying to access protected paths, redirect to login
  if (!session.accessToken && !lngPublicPaths.some(path => _req.nextUrl.pathname.startsWith(path))) {
    return NextResponse.redirect(new URL(`/${fallbackLng}/user/login?redirect=${_req.nextUrl.pathname}`, _req.url))
  }

  return
}
