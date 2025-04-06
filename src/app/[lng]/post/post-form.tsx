'use client'

import { Button, Form, SelectProps, message } from 'antd'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { Control, FieldValues, FormProvider } from 'react-hook-form'
import { z } from 'zod'

import Input from '@/components/antd/input'
import Tag from '@/components/antd/tag'
import { useClientTranslation } from '@/i18n/client'
import { useZodForm, validators } from '@/lib/utils/form-utils'
import { createPost, updatePost } from '@/services/client/posts'
import { IPost, IPostFormValues } from '@/types/post'

const options: SelectProps['options'] = [
  {
    value: 'python',
    label: 'Python'
  },
  {
    value: 'java',
    label: 'Java'
  },
  {
    value: 'cSharp',
    label: 'C#'
  },
  {
    value: 'cPlusPlus',
    label: 'C++'
  },
  {
    value: 'ruby',
    label: 'Ruby'
  },
  {
    value: 'go',
    label: 'Go'
  },
  {
    value: 'swift',
    label: 'Swift'
  },
  {
    value: 'kotlin',
    label: 'Kotlin'
  },
  {
    value: 'php',
    label: 'PHP'
  },
  {
    value: 'rust',
    label: 'Rust'
  }
]

const defaultValues: IPostFormValues = {
  title: '',
  author: '',
  content: '',
  tags: []
}

export default function PostForm({ lng, data }: { lng: string; data?: IPost }) {
  const { t } = useClientTranslation(lng, 'post')
  const router = useRouter()
  const [form] = Form.useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formSchema = useMemo(() => {
    return z.object({
      title: validators.required('Title', t),
      author: z.string(),
      content: validators.required('Content', t),
      tags: z.array(z.string())
    })
  }, [t])

  const formModule = useZodForm(formSchema, data || defaultValues)

  const { control: typedControl, handleSubmit } = formModule
  // Double-cast to avoid TypeScript error
  const control = typedControl as unknown as Control<FieldValues>

  const isEdit = !!(data && data.id)

  const onSubmitValid = async (formValues: IPostFormValues) => {
    setIsSubmitting(true)

    try {
      if (!isEdit) {
        await createPost(formValues)
        message.success('Created successfully')
      } else if (data) {
        await updatePost(data.id, formValues)
        message.success('Updated successfully')
      }

      router.push(`/${lng}/post`)
      router.refresh()
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-[600px] py-4">
      <Form
        className="app-form"
        colon={false}
        data-testid="announcement-form"
        disabled={isSubmitting}
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={handleSubmit(onSubmitValid)}
      >
        <FormProvider {...formModule}>
          <Form.Item required label={t('fields.title')}>
            <Input control={control} name="title" placeholder={t('placeholder.title')} testId="title" />
          </Form.Item>

          <Form.Item label={t('fields.author')}>
            <Input control={control} name="author" placeholder={t('placeholder.author')} testId="author" />
          </Form.Item>

          <Form.Item required label={t('fields.content')}>
            <Input control={control} name="content" placeholder={t('placeholder.content')} testId="content" />
          </Form.Item>

          <Form.Item label={t('fields.tags')}>
            <Tag control={control} name="tags" options={options} placeholder={t('placeholder.tags')} testId="tags" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button htmlType="submit" loading={isSubmitting} type="primary">
              {t('common:actions.submit')}
            </Button>
          </Form.Item>
        </FormProvider>
      </Form>
    </div>
  )
}
