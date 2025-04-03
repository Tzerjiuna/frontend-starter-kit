import { useTranslation } from '@/i18n'
import { Button } from 'antd'
import Link from 'next/link'

import PostTable from './post-table'
import { SearchParams, getPosts } from '@/api/posts'
import { ParamProps } from '@/types/common'

export default async function Page({
  params: { lng },
  searchParams
}: {
  params: ParamProps
  searchParams: SearchParams
}) {
  const { t } = await useTranslation(lng, ['common', 'post'])
  const postsRes = await getPosts(searchParams)

  return (
    <div className="flex flex-col gap-4 m-4">
      <div className="flex justify-between">
        <h1 className="my-auto">{t('post:pageTitle.postList')}</h1>

        <Link href={`/${lng}/post/add`}>
          <Button className="app-button">{t('common:actions.add')}</Button>
        </Link>
      </div>

      <hr />

      {postsRes && <PostTable lng={lng} pagination={postsRes.meta} posts={postsRes.data} />}
    </div>
  )
}
