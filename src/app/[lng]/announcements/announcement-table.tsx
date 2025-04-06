'use client'

import { Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'

import { useClientTranslation } from '@/i18n/client'
import { IAnnouncement } from '@/types/announcement'

export default function AnnouncementTable({ announcements, lng }: { announcements: IAnnouncement[]; lng: string }) {
  const { t } = useClientTranslation(lng, 'announcement')

  const columns: ColumnsType<IAnnouncement> = [
    {
      title: t('columns.no'),
      dataIndex: 'no',
      key: 'no',
      width: 80,
      sorter: (a, b) => a.no - b.no
    },
    {
      title: t('columns.title'),
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <a href={record.url} rel="noopener noreferrer" target="_blank">
          {text}
        </a>
      )
    },
    {
      title: t('columns.publishAt'),
      dataIndex: 'publishAt',
      key: 'publishAt',
      render: text => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
      sorter: (a, b) => new Date(a.publishAt).getTime() - new Date(b.publishAt).getTime()
    },
    {
      title: t('columns.order'),
      dataIndex: 'order',
      key: 'order',
      width: 100,
      sorter: (a, b) => a.order - b.order
    },
    {
      title: t('columns.isEmphasize'),
      dataIndex: 'isEmphasize',
      key: 'isEmphasize',
      width: 120,
      render: text => <Tag color={text ? 'red' : 'default'}>{text ? t('status.emphasize') : t('status.normal')}</Tag>
    },
    {
      title: t('columns.isDisplay'),
      dataIndex: 'isDisplay',
      key: 'isDisplay',
      width: 120,
      render: text => <Tag color={text ? 'green' : 'default'}>{text ? t('status.display') : t('status.hidden')}</Tag>
    }
  ]

  return (
    <Table
      columns={columns}
      dataSource={announcements}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showTotal: total => `Total ${total} items`
      }}
      rowKey="id"
    />
  )
}
