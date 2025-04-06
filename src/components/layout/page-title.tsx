'use client'

import { Button } from 'antd'
import { usePathname, useRouter } from 'next/navigation'

import { useClientTranslation } from '@/i18n/client'

const PageTitle = ({ title, lng, prevPathName }: { title: string; lng: string; prevPathName?: string }) => {
  const { t } = useClientTranslation(lng)
  const router = useRouter()
  const pathname = usePathname().split('/')[2]

  return (
    <>
      <div className="flex items-center">
        <Button type="link" onClick={() => router.push(prevPathName || `/${pathname}`)}>
          ＜{t('common:actions.back')}
        </Button>

        <h1 className="my-auto">{title}</h1>
      </div>
    </>
  )
}

export default PageTitle
