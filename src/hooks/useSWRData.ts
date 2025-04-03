import useSWR, { SWRConfiguration, SWRResponse } from 'swr'

import { ApiErrorType, ApiResponseType, httpClient } from '@/api/client/http-client'

export type SWRDataResponse<T> = Omit<SWRResponse<ApiResponseType<T>, ApiErrorType>, 'data'> & {
  data: T | undefined
  isLoading: boolean
  error: ApiErrorType | undefined
  meta?: Record<string, unknown>
}

const defaultFetcher = async <T>(url: string): Promise<ApiResponseType<T>> => {
  return httpClient.get<T>(url)
}

/**
 * Custom hook for data fetching with SWR
 *
 * @param key - The URL or key for the resource
 * @param config - SWR configuration options
 * @returns SWR response with optimized types and loading state
 */
export function useSWRData<T = unknown>(key: string | null, config?: SWRConfiguration): SWRDataResponse<T> {
  const {
    data: apiResponse,
    error,
    isValidating,
    mutate
  } = useSWR<ApiResponseType<T>, ApiErrorType>(key, defaultFetcher, {
    revalidateOnFocus: false,
    ...config
  })

  // Determine loading state - true when validating with no data, or when key is provided but no data/error
  const isLoading = (!apiResponse && isValidating) || (!!key && !apiResponse && !error)

  return {
    data: apiResponse?.data,
    meta: apiResponse?.meta,
    isLoading,
    error,
    isValidating,
    mutate
  }
}

/**
 * Method to prefetch data for a specific resource
 *
 * @param key - The URL or key for the resource
 * @returns Promise with the fetched data
 */
export async function prefetchData<T>(key: string): Promise<ApiResponseType<T>> {
  return defaultFetcher<T>(key)
}
