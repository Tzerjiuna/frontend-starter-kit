import { IResult } from '@/types'
import { notFound } from 'next/navigation'

import { ApiError } from '@/services/core/error-handler'

export async function fetchServerDataOrNotFound<T>(fetcher: () => Promise<IResult<T>>): Promise<IResult<T>> {
  try {
    const result = await fetcher()
    return result
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound()
      throw new Error('This line should be unreachable after notFound()')
    } else {
      throw error
    }
  }
}
