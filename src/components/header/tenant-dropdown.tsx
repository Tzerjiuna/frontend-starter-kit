'use client'

import { Button, Dropdown } from 'antd'
import Link from 'next/link'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { ChevronDownIcon } from '../icons'
import TextEllipsisMiddle from '../text-ellipsis-middle'
import HeaderDropdownPopup from './header-dropdown-popup'

const TenantDropdown = () => {
  const { t } = useTranslation('header')

  const tenantName = '株式会社マニャーフォワーアードフォワーアードABCDEFG'
  const tenantUid = '1234-1234'

  const dropdownRender = (menu: ReactNode) => {
    return (
      <HeaderDropdownPopup menu={menu}>
        <div className="header-dropdown-info">
          <p className="name">{tenantName}</p>
          <p className="tenant-uid">{`${t('tenantUid')}: ${tenantUid}`}</p>
        </div>
      </HeaderDropdownPopup>
    )
  }

  const handleSwitchTenant = () => {
    sessionStorage.setItem('returnURL', window.location.pathname + window.location.search)
  }

  return (
    <Dropdown
      dropdownRender={dropdownRender}
      menu={{
        items: [
          {
            key: 'switch-tenant',
            label: (
              <Link href="/tenant" onClick={handleSwitchTenant}>
                {t('header:switchTenant')}
              </Link>
            )
          }
        ]
      }}
      overlayStyle={{ width: 300 }}
      placement="topRight"
      trigger={['click']}
    >
      <div className="header-dropdown">
        <Button className="app-button auto header-dropdown-button" type="link">
          <span style={{ maxWidth: 196 }}>
            <TextEllipsisMiddle suffixCount={8}>{tenantName}</TextEllipsisMiddle>
          </span>
          <ChevronDownIcon className="caret-down-icon" />
        </Button>
      </div>
    </Dropdown>
  )
}

export default TenantDropdown
