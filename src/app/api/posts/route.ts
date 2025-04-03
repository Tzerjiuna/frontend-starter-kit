import { StatusCodes } from 'http-status-codes'
import { NextRequest, NextResponse } from 'next/server'

import { logger } from '@/lib/logger'
import { createPost } from '@/lib/mocks/mock-data/post'

// POST method for creating a new post
export async function POST(request: NextRequest) {
  try {
    const postData = await request.json()

    // Create a new post using our helper function
    const newPost = createPost(postData)

    // Return the created post
    return NextResponse.json({ data: newPost }, { status: StatusCodes.CREATED })
  } catch (error) {
    logger.error('Error creating post:', error)
    return NextResponse.json({ error: 'Failed to create post' }, { status: StatusCodes.INTERNAL_SERVER_ERROR })
  }
}

// Make this API route dynamic
export const dynamic = 'force-dynamic'
