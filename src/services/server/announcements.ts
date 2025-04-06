import { logger } from '@/lib/logger'
import { api } from '@/services/core/api'
import { IAnnouncement } from '@/types/announcement'
import { DEFAULT_PAGING_VALUES } from '@/types/paging'
import { IResult } from '@/types/result'

export async function getAnnouncements(page?: number): Promise<IResult<IAnnouncement[]>> {
  const pageNumber = page || DEFAULT_PAGING_VALUES.number
  const pageSize = DEFAULT_PAGING_VALUES.size
  const queryParams = new URLSearchParams()
  queryParams.append('page', pageNumber.toString())
  queryParams.append('size', pageSize.toString())

  const path = `/admin/announcements?${queryParams.toString()}`

  try {
    const result = await api.server.get<IAnnouncement[]>(path)
    return result
  } catch (error) {
    logger.error(`Error fetching announcements from ${path}:`, error)
    throw error
  }
}
