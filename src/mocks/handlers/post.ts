// @ts-nocheck
import { HttpResponse, http } from 'msw'

import { IPost, IResult } from '@/types'

import { mockPosts } from '../data/post'

export const postHandlers = [
  // Handler for GET /posts (match any host)
  http.get('*/posts', () => {
    const response: IResult<IPost[]> = {
      meta: {
        totalCount: mockPosts.length,
        totalPages: 1
      },
      data: mockPosts
    }

    return HttpResponse.json(response)
  }),

  // Handler for GET /posts/:id (match any host)
  http.get('*/posts/:id', ({ params }) => {
    const { id } = params
    const post = mockPosts.find(p => p.id === id) || mockPosts[0]

    if (!post) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Post not found'
      })
    }

    const response: IResult<IPost> = { data: post }
    return HttpResponse.json(response)
  })
]
