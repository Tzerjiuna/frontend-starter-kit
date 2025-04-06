import { CookieStore, IronSession, SessionOptions, getIronSession } from 'iron-session'
import { cookies } from 'next/headers'

export interface SessionData {
  state: string
  nonce: string
  redirectUrl: string
  accessToken: string
  refreshToken: string
}

export const sessionOptions: SessionOptions = {
  password: 'dU#2-</£53jcX[jT%F9Zr0XOV%24>63V',
  cookieName: 'session-auth',
  cookieOptions: {
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
    path: '/'
  }
}

export class SessionService {
  private static instance: SessionService

  private constructor() {}

  public static getInstance(): SessionService {
    if (!SessionService.instance) {
      SessionService.instance = new SessionService()
    }
    return SessionService.instance
  }

  public async getSession(): Promise<IronSession<SessionData>> {
    return await getIronSession<SessionData>(cookies() as CookieStore, sessionOptions)
  }
}

export const sessionService = SessionService.getInstance()
