import { getData, searchData } from '@/actions/api'
import { logger } from '@/lib/logger'
import { postMockHandlers, useMocks } from '@/lib/mocks/post'
import { IPost } from '@/types/post'
import { IResult } from '@/types/result'

/**
 * Search parameters for fetching posts
 */
export interface SearchParams {
  page?: string
}

/**
 * Fetches a paginated list of posts
 * This function automatically uses mock data if mocking is enabled via the centralized mock configuration
 * @param searchParams - Search parameters including pagination
 * @returns The complete response including success, data and metadata
 */
export async function getPosts(searchParams: SearchParams): Promise<IResult<IPost[]> | undefined> {
  try {
    const { page } = searchParams
    const metadata = {
      page: {
        size: 25,
        number: page ? Number(page) : 1
      }
    }

    if (useMocks) {
      const mockResponse = postMockHandlers.searchPosts('/posts/search', metadata)
      if (mockResponse && mockResponse.success) {
        return mockResponse.data
      }
    }

    const response = await searchData<IResult<IPost[]>>('/posts/search', metadata)

    if (!response.success) {
      logger.error('Error fetching posts:', response.error)
      return undefined
    }

    return response.data
  } catch (error) {
    logger.error('Exception in getPosts:', error)
    return undefined
  }
}

/**
 * Fetches a single post by ID
 * This function automatically uses mock data if mocking is enabled via the centralized mock configuration
 * @param id - The unique identifier of the post to retrieve
 * @returns The post object if found, undefined otherwise
 */
export async function getPost(id: string): Promise<IPost | undefined> {
  try {
    if (useMocks) {
      const mockResponse = postMockHandlers.getPostById(`/posts/${id}`)
      if (mockResponse && mockResponse.success) {
        return mockResponse.data
      }
    }

    const response = await getData<{ data: IPost }>(`/posts/${id}`)

    if (!response.success || !response.data) {
      logger.error('Error fetching post:', response.error)
      return undefined
    }

    return response.data.data
  } catch (error) {
    logger.error('Exception in getPost:', error)
    return undefined
  }
}
