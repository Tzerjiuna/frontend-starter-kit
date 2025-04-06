import { useTranslation } from '@/i18n'
import { IPost, IResult } from '@/types'
import { Button } from 'antd'
import Link from 'next/link'

import PostTable from './post-table'
import { fetchServerDataOrNotFound } from '@/lib/data-fetching/server-helpers'
import * as postsService from '@/services/server/posts'
import { ParamProps, SearchParams } from '@/types/common'

export default async function Page({
  params: { lng },
  searchParams
}: {
  params: ParamProps
  searchParams: SearchParams
}) {
  const { t } = await useTranslation(lng, ['common', 'post'])

  const postsRes: IResult<IPost[]> = await fetchServerDataOrNotFound<IPost[]>(() => postsService.getPosts(searchParams))

  if (!postsRes || !postsRes.data) {
    return <div>Could not load posts data or no posts found.</div>
  }

  return (
    <div className="flex flex-col gap-4 m-4">
      <div className="flex justify-between">
        <h1 className="my-auto">{t('post:pageTitle.postList')}</h1>
        <Link href={`/${lng}/post/add`}>
          <Button className="app-button">{t('common:actions.add')}</Button>
        </Link>
      </div>
      <PostTable lng={lng} pagination={postsRes.meta} posts={postsRes.data} />
    </div>
  )
}
