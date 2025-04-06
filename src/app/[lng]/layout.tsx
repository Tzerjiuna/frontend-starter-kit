import '@/styles/init.scss'
import { App, Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { Metadata } from 'next'
import NextTopLoader from 'nextjs-toploader'

import Hydration from './hydration'
import { AntdConfigProvider, AntdProvider } from './providers'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteSider } from '@/components/layout/site-sider'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { ParamProps } from '@/types/common'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`
  },
  description: siteConfig.description
}

export default async function RootLayout({
  children,
  params: { lng }
}: {
  children: React.ReactNode
  params: ParamProps
}) {
  return (
    <html suppressHydrationWarning lang={lng}>
      <head />
      <body suppressHydrationWarning className={cn('bg-background font-sans antialiased overflow-y-hidden')}>
        <NextTopLoader showSpinner={false} />

        <AntdProvider>
          <AntdConfigProvider>
            <Hydration>
              <App notification={{ placement: 'bottomLeft' }}>
                <Layout className="app-layout w-screen h-screen">
                  <SiteHeader />

                  <Layout>
                    <SiteSider lng={lng} />

                    <Layout>
                      <Content>
                        <App className="w-full h-full overflow-auto">{children}</App>
                      </Content>
                    </Layout>
                  </Layout>
                </Layout>
              </App>
            </Hydration>
          </AntdConfigProvider>
        </AntdProvider>
      </body>
    </html>
  )
}
