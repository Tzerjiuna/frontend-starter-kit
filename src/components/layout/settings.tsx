import { MenuProps } from 'antd'
import { useTranslation } from 'react-i18next'

import { AnnouncementIcon, PostIcon, SettingIcon, UserIcon } from '../icons'
import { RouteConfig } from '@/helpers/routeConfig'

export const routeConfigs: RouteConfig[] = [
  {
    key: 'post',
    path: '/post'
  },
  {
    key: 'announcement',
    path: '/announcements'
  },
  {
    key: 'user',
    path: '/user'
  },
  {
    key: 'settings',
    path: '/settings'
  }
]

const RenderLabel = ({ langKey }: { langKey: string }) => {
  const { t } = useTranslation('sider')

  return <span key={langKey}>{t(langKey)}</span>
}

export const navItems: MenuProps['items'] = [
  {
    key: 'post',
    icon: <PostIcon className="sider-icon" />,
    label: <RenderLabel langKey="post" />
  },
  {
    key: 'announcement',
    icon: <AnnouncementIcon className="sider-icon" />,
    label: <RenderLabel langKey="announcement" />
  },
  {
    key: 'user',
    icon: <UserIcon className="sider-icon" />,
    label: <RenderLabel langKey="user" />
  },
  {
    key: 'settings',
    icon: <SettingIcon className="sider-icon" />,
    label: <RenderLabel langKey="settings" />
  }
]
