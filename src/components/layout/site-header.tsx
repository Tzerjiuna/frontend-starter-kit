'use client'

import { Divider } from 'antd'
import { Header } from 'antd/es/layout/layout'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import TenantDropdown from '../header/tenant-dropdown'
import UserDropdown from '../header/user-dropdown'
import { AnnouncementIcon, GridIcon, HelpIcon, NotificationIcon } from '../icons'

export function SiteHeader() {
  const pathname = usePathname() as string

  return (
    <Header className="app-header">
      <div className="flex items-center">
        <div className="flex">
          <GridIcon className="btn-icon" />
          <Divider className="logo-divider" type="vertical" />
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <Image alt="Logo" height={20} src="/logo-header.svg" width={232} />
          </Link>
        </div>

        {!pathname.includes('user/login') && (
          <div className="flex flex-1 items-center justify-end">
            <div className="flex items-center justify-end btn-icon-group">
              <AnnouncementIcon className="btn-icon" />
              <NotificationIcon className="btn-icon" />
              <HelpIcon className="btn-icon" />
            </div>

            <TenantDropdown />
            <UserDropdown />
          </div>
        )}
      </div>
    </Header>
  )
}
