'use client'

import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs'
import Entity from '@ant-design/cssinjs/lib/Cache'
import { ConfigProvider, Empty } from 'antd'
import { useParams, useServerInsertedHTML } from 'next/navigation'
import { useMemo } from 'react'

import { useClientTranslation } from '@/i18n/client'

export const AntdProvider = ({ children }: React.PropsWithChildren) => {
  const cache = useMemo<Entity>(() => createCache(), [])

  useServerInsertedHTML(() => <style dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} id="antd" />)

  return (
    <StyleProvider cache={cache} hashPriority="high">
      {children}
    </StyleProvider>
  )
}

export const AntdConfigProvider = ({ children }: React.PropsWithChildren) => {
  const params = useParams()
  const { t } = useClientTranslation(params.lng as string)

  const defaultGetPopupContainer = () => {
    return (document.querySelector('.app-layout') as HTMLElement) || undefined
  }

  return (
    <ConfigProvider
      getPopupContainer={defaultGetPopupContainer}
      renderEmpty={() => <Empty description={t('message.noData')} />}
      table={{ className: 'app-table' }}
      theme={{
        token: {
          colorPrimary: '#3b7de9',
          colorInfo: '#3b7de9',
          colorError: '#ec4949',
          borderRadius: 4
        },
        components: {
          Button: {
            colorBorder: 'rgb(59, 125, 233)',
            colorText: 'rgb(59, 125, 233)',
            contentFontSizeSM: 13,
            contentLineHeightSM: 1,
            paddingInlineSM: 8,
            paddingBlockSM: 2,
            contentFontSize: 13,
            contentLineHeight: 1,
            paddingInline: 8,
            paddingBlock: 6
          },
          Table: {
            headerBg: 'rgb(241, 241, 241)',
            borderColor: 'rgb(226, 226, 226)',
            padding: 8,
            fontSize: 13,
            borderRadius: 0,
            headerBorderRadius: 0,
            fontWeightStrong: 400,
            rowHoverBg: 'rgb(235, 241, 251)',
            rowSelectedBg: 'rgb(203, 230, 255)',
            rowSelectedHoverBg: 'rgb(203, 230, 255)'
          },
          Checkbox: {
            colorBgContainerDisabled: 'rgb(145, 145, 145)',
            colorBorder: 'rgb(145, 145, 145)',
            colorPrimary: 'rgb(59, 125, 233)',
            colorPrimaryBorder: 'rgb(59, 125, 233)',
            colorTextDisabled: 'rgb(145, 145, 145)',
            colorText: 'rgb(48, 48, 48)',
            borderRadiusSM: 2,
            controlInteractiveSize: 18,
            lineWidth: 2
          },
          Input: {
            fontSize: 13,
            colorBgContainerDisabled: '#F1F1F1',
            colorTextDisabled: '#919191'
          }
        }
      }}
    >
      {children}
    </ConfigProvider>
  )
}
