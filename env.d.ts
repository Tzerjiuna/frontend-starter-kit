namespace NodeJS {
  interface ProcessEnv {
    APP_ENV: 'development' | 'staging' | 'production'

    NEXT_PUBLIC_API_BASE_URL: string

    NEXT_PUBLIC_MFID_BASE_URL: string
    NEXT_PUBLIC_MFID_CLIENT_ID: string
    NEXT_PUBLIC_MFID_CLIENT_SECRET: string

    USE_API_MOCKS: string

    SECRET_COOKIE_PASSWORD?: string
    SESSION_COOKIE_NAME?: string
  }
}
