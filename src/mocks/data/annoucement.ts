import { IAnnouncement } from '@/types'

export const mockAnnouncements: IAnnouncement[] = [
  {
    id: '1',
    no: 1,
    title: 'System Maintenance Notice',
    url: 'https://example.com/maintenance',
    publishAt: '2024-03-20T10:00:00Z',
    order: 1,
    isEmphasize: true,
    isDisplay: true
  },
  {
    id: '2',
    no: 2,
    title: 'New Feature Release',
    url: 'https://example.com/features',
    publishAt: '2024-03-19T15:30:00Z',
    order: 2,
    isEmphasize: false,
    isDisplay: true
  },
  {
    id: '3',
    no: 3,
    title: 'Security Update',
    url: 'https://example.com/security',
    publishAt: '2024-03-18T09:15:00Z',
    order: 3,
    isEmphasize: true,
    isDisplay: false
  }
]
