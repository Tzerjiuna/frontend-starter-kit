import { useTranslation } from '@/i18n'
import { IAnnouncement, IResult } from '@/types'

import AnnouncementTable from './announcement-table'
import { fetchServerDataOrNotFound } from '@/lib/data-fetching/server-helpers'
import { getAnnouncements } from '@/services/server'
import * as announcementsService from '@/services/server/announcements'
import { ParamProps } from '@/types/common'

export default async function Page({ params: { lng } }: { params: ParamProps }) {
  const { t } = await useTranslation(lng, ['announcement'])
  const announcements = await getAnnouncements()

  const postsRes: IResult<IAnnouncement[]> = await fetchServerDataOrNotFound<IAnnouncement[]>(() =>
    announcementsService.getAnnouncements()
  )

  if (!postsRes || !postsRes.data) {
    return <div>Could not load announcements data or no announcements found.</div>
  }

  return (
    <div className="flex flex-col gap-4 m-4">
      <div className="flex items-center">
        <h1 className="my-auto">{t('pageTitle.announcements')}</h1>
      </div>

      <hr />

      {announcements && <AnnouncementTable announcements={announcements.data} lng={lng} />}
    </div>
  )
}
