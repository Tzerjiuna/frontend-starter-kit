'use client'

import Icon from '@ant-design/icons'
import type { GetProps } from 'antd';

import Announcement from '/public/icons/header/announcement.svg'
import ChevronDown from '/public/icons/chevron-down.svg'
import Grid from '/public/icons/header/grid.svg'
import Help from '/public/icons/header/help.svg'
import Notification from '/public/icons/header/notification.svg'
import ChevronLeft from '/public/icons/chevron-left.svg'
import Setting from '/public/icons/sider/setting.svg'
import User from '/public/icons/sider/user.svg'
import Post from '/public/icons/sider/post.svg'

type CustomIconComponentProps = GetProps<typeof Icon>;

export const AnnouncementIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={Announcement} {...props} />
}

export const ChevronDownIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={ChevronDown} {...props} />
}

export const GridIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={Grid} {...props} />
}

export const HelpIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={Help} {...props} />
}

export const NotificationIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={Notification} {...props} />
}

export const ChevronLeftIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={ChevronLeft} {...props} />
}

export const SettingIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={Setting} {...props} />
}

export const UserIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={User} {...props} />
}

export const PostIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={Post} {...props} />
}
