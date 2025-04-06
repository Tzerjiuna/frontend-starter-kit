import { NextRequest, NextResponse } from 'next/server'

import { logger } from '@/lib/logger'
import { createPost } from '@/services/client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const post = await createPost(body)
    return NextResponse.json(post)
  } catch (error) {
    logger.error('Error creating post:', error)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}
