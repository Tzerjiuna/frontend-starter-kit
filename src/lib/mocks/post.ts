import { shouldUseMockApi } from '@/config/api-config'
import { mockPosts } from '@/lib/mocks/mock-data/post'
import { IPost } from '@/types/post'

/**
 * Flag to determine if post-related API endpoints should use mock data
 * Uses the centralized mock configuration system from api-config.ts
 */
export const useMocks = shouldUseMockApi('posts')

// Define response types for better type safety
interface PostResponse {
  success: boolean
  data: IPost
}

interface PostsSearchResponse {
  success: boolean
  data: {
    data: IPost[]
    meta: {
      totalCount: number
      totalPages: number
    }
  }
}

interface PageOptions {
  page?: {
    number?: number
    size?: number
  }
}

/**
 * Mock handlers for post-related endpoints
 */
export const postMockHandlers = {
  /**
   * Handle GET /posts/:id
   */
  getPostById: (url: string): PostResponse | null => {
    // Check if URL pattern matches /posts/{id}
    if (url.match(/\/posts\/\d+$/)) {
      const id = url.split('/').pop() || ''
      const post = mockPosts.find(p => p.id === id)

      if (!post) {
        throw new Error('Post not found')
      }

      return {
        success: true,
        data: post
      }
    }
    return null
  },

  /**
   * Handle POST /posts/search
   */
  searchPosts: (url: string, body: PageOptions): PostsSearchResponse | null => {
    if (url === '/posts/search') {
      const pageNumber = body.page?.number || 1
      const pageSize = body.page?.size || 25

      // Calculate pagination
      const start = (pageNumber - 1) * pageSize
      const end = start + pageSize
      const paginatedPosts = mockPosts.slice(start, end)

      return {
        success: true,
        data: {
          data: paginatedPosts,
          meta: {
            totalCount: mockPosts.length,
            totalPages: Math.ceil(mockPosts.length / pageSize)
          }
        }
      }
    }
    return null
  }
}
