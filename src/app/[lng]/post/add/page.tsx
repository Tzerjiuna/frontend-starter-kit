import { useTranslation } from '@/i18n'

import PostForm from '../post-form'
import PageTitle from '@/components/layout/page-title'
import { ParamProps } from '@/types/common'

export default async function Page({ params: { lng } }: { params: ParamProps }) {
  const { t } = await useTranslation(lng, ['post'])

  return (
    <div className="flex flex-col gap-4 m-4">
      <div className="flex justify-between">
        <PageTitle lng={lng} title={t('post:pageTitle.addPost')} />
      </div>

      <hr />

      <PostForm lng={lng} />
    </div>
  )
}
