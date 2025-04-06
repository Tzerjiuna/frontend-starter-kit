import { z } from 'zod'

// Extend Zod with custom methods
declare module 'zod' {
  interface ZodType {
    dayjs(message: string): z.ZodType
    pastTime(message: string): z.ZodType
  }
}

declare module 'iron-session' {
  interface CookieStore {
    get: (name: string) =>
      | {
          name: string
          value: string
        }
      | undefined
    set: {
      (name: string, value: string, cookie?: Partial<ResponseCookie>): void
      (options: ResponseCookie): void
    }
  }
}
