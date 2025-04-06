import { useTranslation } from '@/i18n'
import { IPost, IResult } from '@/types'

import PostForm from '../../post-form'
import PageTitle from '@/components/layout/page-title'
import { fetchServerDataOrNotFound } from '@/lib/data-fetching/server-helpers'
import { getPost } from '@/services/server/posts'
import { ParamProps } from '@/types/common'

export default async function Page({ params: { lng, id } }: { params: ParamProps }) {
  const { t } = await useTranslation(lng, ['post'])
  const postId = id || ''

  const postsRes: IResult<IPost> = await fetchServerDataOrNotFound<IPost>(() => getPost(postId))

  if (!postsRes || !postsRes.data) {
    return <div>Could not load posts data or no posts found.</div>
  }

  return (
    <div className="flex flex-col gap-4 m-4">
      <div className="flex items-center">
        <PageTitle lng={lng} title={t('post:pageTitle.editPost')} />
      </div>

      <hr />

      <PostForm data={postsRes.data} lng={lng} />
    </div>
  )
}
