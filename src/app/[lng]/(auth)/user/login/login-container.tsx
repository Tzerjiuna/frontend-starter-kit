'use client'

import { Button } from 'antd'
import { useParams } from 'next/navigation'

import { useClientTranslation } from '@/i18n/client'

export default function LoginContainer() {
  const params = useParams()
  const lng = params.lng as string
  const { t } = useClientTranslation(lng, 'auth')

  const handleLogin = async () => {
    window.location.assign('/api/auth/mfid/login')
  }

  return (
    <div className="flex flex-col m-4">
      <h1>{t('heading')}</h1>
      <p>{t('desc')}</p>

      <div className="mt-4">
        <Button type="primary" onClick={handleLogin}>
          {t('login')}
        </Button>
        <Button type="link">{t('createAccount')}</Button>
      </div>
    </div>
  )
}
