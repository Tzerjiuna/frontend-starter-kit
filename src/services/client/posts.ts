import { IResult } from '@/types'

import { api } from '../core/api'
import { logger } from '@/lib/logger'
import { IPost, IPostFormValues } from '@/types/post'

export async function createPost(postData: IPostFormValues): Promise<IResult<IPost>> {
  try {
    const result = await api.client.post<IPost>('/posts', postData as unknown as Record<string, unknown>)
    return result
  } catch (error) {
    logger.error('Error creating post:', error)
    throw error
  }
}

export async function updatePost(id: string, postData: Partial<IPost>): Promise<IResult<IPost>> {
  try {
    const result = await api.client.put<IPost>(`/posts/${id}`, postData)
    return result
  } catch (error) {
    logger.error('Error updating post:', error)
    throw error
  }
}

export async function deletePost(id: string): Promise<IResult<null>> {
  try {
    const result = await api.client.delete<null>(`/posts/${id}`)
    return result
  } catch (error) {
    logger.error('Error deleting post:', error)
    throw error
  }
}
