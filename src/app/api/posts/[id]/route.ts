import { NextRequest, NextResponse } from 'next/server'

import { logger } from '@/lib/logger'
import { deletePost, updatePost } from '@/services/client'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const post = await updatePost(params.id, body)
    return NextResponse.json(post)
  } catch (error) {
    logger.error('Error updating post:', error)
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await deletePost(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('Error deleting post:', error)
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
  }
}
