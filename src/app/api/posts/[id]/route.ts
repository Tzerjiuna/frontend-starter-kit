import { StatusCodes } from 'http-status-codes'
import { NextRequest, NextResponse } from 'next/server'

import { logger } from '@/lib/logger'
import { deletePost, getPostById, updatePost } from '@/lib/mocks/mock-data/post'
import { IPost } from '@/types/post'
import { IResult } from '@/types/result'

// GET a specific post by ID
export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  // Get the post by ID using our helper function
  const post = getPostById(id)

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: StatusCodes.NOT_FOUND })
  }

  const result: IResult<IPost> = { data: post }

  return NextResponse.json(result, { status: StatusCodes.OK })
}

// PUT/UPDATE a specific post
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    const updatedData = await request.json()

    // Update the post using our helper function
    const updatedPost = updatePost(id, updatedData)

    if (!updatedPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: StatusCodes.NOT_FOUND })
    }

    return NextResponse.json({}, { status: StatusCodes.OK })
  } catch (error) {
    logger.error('Error updating post:', error)
    return NextResponse.json({ error: 'Failed to update post' }, { status: StatusCodes.INTERNAL_SERVER_ERROR })
  }
}

// DELETE a specific post
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  // Delete the post using our helper function
  const success = deletePost(id)

  if (!success) {
    return NextResponse.json({ error: 'Post not found' }, { status: StatusCodes.NOT_FOUND })
  }

  return NextResponse.json({}, { status: StatusCodes.OK })
}

// Make this API route dynamic
export const dynamic = 'force-dynamic'
