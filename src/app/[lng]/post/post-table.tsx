'use client'

import { App, Button, message } from 'antd'
import { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'

import Table from '@/components/antd/table'
import { DISPLAY_DATE_FORMAT } from '@/constants/date'
import { useClientTranslation } from '@/i18n/client'
import { updateSearchParams } from '@/lib/utils'
import { deletePost } from '@/services/client/posts'
import { IPagingRes } from '@/types/paging'
import { IPost } from '@/types/post'

export default function PostTable({
  posts,
  pagination,
  lng
}: {
  posts: IPost[]
  pagination: IPagingRes | undefined
  lng: string
}) {
  const { t } = useClientTranslation(lng, 'post')
  const { modal } = App.useApp()
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = searchParams.get('page')
  const currentPage = useMemo(() => (page ? Number(page) : 1), [page])

  const onChangePagination = useCallback(
    async (page: number) => {
      const newPathname = updateSearchParams('page', page.toString())
      router.push(newPathname)
      router.refresh()
    },
    [router]
  )

  const handleDeletePost = useCallback(
    async (id: string) => {
      try {
        await deletePost(id)
        message.success(t('message.deleteSuccess'))
        router.refresh()
      } catch (error) {
        message.success(t('message.deleteError'))
      }
    },
    [t, router]
  )

  const confirmDeletePost = useCallback(
    (id: string) => {
      modal.confirm({
        className: 'app-modal',
        title: 'Delete Post',
        content: 'You are deleting a post. Is it OK ?',
        okText: t('actions.delete'),
        okType: 'danger',
        cancelText: t('actions.cancel'),
        cancelButtonProps: {
          className: 'btn-cancel'
        },
        closable: true,
        maskClosable: true,
        onOk: () => handleDeletePost(id)
      })
    },
    [t, modal, handleDeletePost]
  )

  const columns: ColumnsType<IPost> = useMemo(
    () => [
      {
        title: t('columns.title'),
        dataIndex: 'title'
      },
      {
        title: t('columns.createdDate'),
        dataIndex: 'createdDate',
        render: (createdDate: string) => (createdDate ? dayjs(createdDate).format(DISPLAY_DATE_FORMAT) : '')
      },
      {
        title: t('columns.author'),
        dataIndex: 'author'
      },
      {
        title: t('columns.content'),
        dataIndex: 'content'
      },
      {
        title: t('columns.tags'),
        dataIndex: 'tags',
        render: (tags: string[]) => <span>{tags.join(', ')}</span>
      },
      {
        key: 'actions',
        width: 120,
        className: 'tcell-text-right',
        render: (_: unknown, post: IPost) => {
          return (
            <div>
              <Button color="danger" variant="outlined" onClick={() => confirmDeletePost(post.id)}>
                {t('actions.delete')}
              </Button>
              &nbsp;
              <Link href={`/${lng}/post/${post.id}/edit`}>
                <Button color="primary">{t('actions.edit')}</Button>
              </Link>
            </div>
          )
        }
      }
    ],
    [t, confirmDeletePost, lng]
  )

  return (
    <Table
      columns={columns}
      dataSource={posts}
      pagination={{
        current: currentPage,
        total: pagination?.totalCount,
        showTotal: total => `ページ (${total}件)`,
        onChange: onChangePagination
      }}
      rowKey="id"
    />
  )
}
