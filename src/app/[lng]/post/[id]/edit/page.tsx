import { useTranslation } from '@/i18n'

import PostForm from '../../post-form'
import { getPost } from '@/api/posts'
import PageTitle from '@/components/layout/page-title'
import { ParamProps } from '@/types/common'

export default async function Page({ params: { lng, id } }: { params: ParamProps }) {
  const { t } = await useTranslation(lng, ['post'])

  const postId = id || ''
  const data = await getPost(postId)

  return (
    <div className="flex flex-col gap-4 m-4">
      <div className="flex items-center">
        <PageTitle lng={lng} title={t('post:pageTitle.editPost')} />
      </div>

      <hr />

      <PostForm data={data} lng={lng} />
    </div>
  )
}
