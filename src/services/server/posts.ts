import { IResult } from '@/types'

import { logger } from '@/lib/logger'
import { api } from '@/services/core/api'
import { DEFAULT_PAGING_VALUES } from '@/types/paging'
import { IPost } from '@/types/post'

export async function getPosts(params?: { page?: string }): Promise<IResult<IPost[]>> {
  const pageNumber = params?.page ? parseInt(params.page, 10) : DEFAULT_PAGING_VALUES.number
  const pageSize = DEFAULT_PAGING_VALUES.size
  const queryParams = new URLSearchParams()
  queryParams.append('page', pageNumber.toString())
  queryParams.append('size', pageSize.toString())

  const path = `/posts?${queryParams.toString()}`

  try {
    const result = await api.server.get<IPost[]>(path)
    return result
  } catch (error) {
    logger.error(`Error fetching posts from ${path}:`, error)
    throw error
  }
}

export async function getPost(id: string): Promise<IResult<IPost>> {
  const path = `/posts/${id}`

  try {
    const result = await api.server.get<IPost>(path)
    return result
  } catch (error) {
    logger.error(`Error fetching post ${id} from ${path}:`, error)
    throw error
  }
}
