'use client'

import { Button, Dropdown, Typography } from 'antd'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { ChevronDownIcon } from '../icons'
import HeaderDropdownPopup from './header-dropdown-popup'
import { logger } from '@/lib/logger'

const { Text } = Typography

const UserDropdown = () => {
  const { t } = useTranslation('header')
  const router = useRouter()
  const params = useParams()
  const lng = params.lng as string

  const username = '山田太郎山郎山田太郎山郎山田太郎山郎山'

  const dropdownRender = (menu: ReactNode) => {
    return (
      <HeaderDropdownPopup menu={menu}>
        <div className="header-dropdown-info">
          <p className="name">{username}</p>
        </div>
      </HeaderDropdownPopup>
    )
  }

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        router.push(`/${lng}/user/login`)
      } else {
        logger.error('Failed to log out')
      }
    } catch (error) {
      logger.error('Error during logout:', error)
    }
  }

  return (
    <Dropdown
      dropdownRender={dropdownRender}
      menu={{
        items: [
          {
            key: 'user-setting',
            label: <Link href="/">{t('userSetting') || 'Settings'}</Link>
          },
          {
            key: 'logout',
            label: (
              <Link href="#" onClick={handleLogout}>
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
