import { logger } from '@/lib/logger'
import { logout } from '@/services/server/auth'

export async function POST(): Promise<Response> {
  try {
    const success = await logout()
    return Response.json({ success })
  } catch (error) {
    logger.error('Error logging out:', error)
    return Response.json({ success: false }, { status: 500 })
  }
}
