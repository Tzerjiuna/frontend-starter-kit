namespace NodeJS {
  interface ProcessEnv {
    APP_ENV: 'development' | 'staging' | 'production'

    NEXT_PUBLIC_MFID_BASE_URL: string
    NEXT_PUBLIC_MFID_CLIENT_ID: string
    NEXT_PUBLIC_MFID_CLIENT_SECRET: string // MSW only

    NEXT_PUBLIC_API_BASE_URL: string

    // Mock API configuration
    NEXT_PUBLIC_USE_MOCK_API?: string // 'true' or 'false'
    NEXT_PUBLIC_MOCK_MFID_AUTH?: string // 'true' or 'false'

    // Base path for application (used in basePath.ts)
    NEXT_PUBLIC_BASE_PATH?: string
  }
}
