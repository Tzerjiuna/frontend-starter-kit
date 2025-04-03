'use client'

import { Button, Dropdown, Typography } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { ChevronDownIcon } from '../icons'
import HeaderDropdownPopup from './header-dropdown-popup'
import { handleDeleteSession } from '@/actions/session'
import { fallbackLng } from '@/i18n/settings'

const { Text } = Typography

const UserDropdown = () => {
  const { t } = useTranslation('header')
  const router = useRouter()

  const username = '山田太郎山郎山田太郎山郎山田太郎山郎山'

  const handleLogout = async () => {
    await handleDeleteSession()
    router.push(`/${fallbackLng}/user/login`)
  }

  const dropdownRender = (menu: ReactNode) => {
    return (
      <HeaderDropdownPopup menu={menu}>
        <div className="header-dropdown-info">
          <p className="name">{username}</p>
        </div>
      </HeaderDropdownPopup>
    )
  }

  return (
    <Dropdown
      dropdownRender={dropdownRender}
      menu={{
        items: [
          {
            key: 'user-setting',
            label: <Link href="/">{t('userSetting')}</Link>
          },
          {
            key: 'logout',
            label: (
              <Link href={`/${fallbackLng}/logout`} onClick={handleLogout}>
                {t('logout')}
              </Link>
            )
          }
        ]
      }}
      overlayStyle={{ width: 235 }}
      placement="topRight"
      trigger={['click']}
    >
      <div className="header-dropdown">
        <Button className="app-button auto header-dropdown-button" type="link">
          <Text ellipsis={true} style={{ maxWidth: 156 }}>
            {username}
          </Text>
          <ChevronDownIcon className="caret-down-icon" />
        </Button>
      </div>
    </Dropdown>
  )
}

export default UserDropdown
