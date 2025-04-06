// @ts-nocheck
import { HttpResponse, http } from 'msw'

import { IAnnouncement, IResult } from '@/types'

import { mockAnnouncements } from '../data/annoucement'

export const announcementHandlers = [
  // Handler for GET /announcements (match any host)
  http.get('*/announcements', () => {
    const response: IResult<IAnnouncement[]> = {
      meta: {
        totalCount: mockAnnouncements.length,
        totalPages: 1
      },
      data: mockAnnouncements
    }

    return HttpResponse.json(response)
  }),
]
