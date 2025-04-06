import '@testing-library/jest-dom'
import { enableFetchMocks } from 'jest-fetch-mock'
import mockRouter from 'next-router-mock'

// Enable fetch mocks
enableFetchMocks()

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    ...mockRouter,
    refresh: jest.fn()
  })
}))

// Polyfill for environments without Response (like Node.js in some test configs)
if (typeof Response === 'undefined') {
  class MockResponse {
    body: string
    status: number
    statusText: string
    headers: Headers
    ok: boolean

    constructor(body: string, options?: { status?: number; statusText?: string; headers?: Record<string, string> }) {
      this.body = body
      this.status = options?.status || 200
      this.statusText = options?.statusText || ''
      this.headers = new Headers(options?.headers)
      this.ok = this.status >= 200 && this.status < 300
    }

    json() {
      return Promise.resolve(JSON.parse(this.body))
    }

    text() {
      return Promise.resolve(this.body)
    }
  }

  // @ts-expect-error - Assign global Response
  global.Response = MockResponse
}

// Polyfill for Request
if (typeof Request === 'undefined') {
  class MockRequest {
    url: string
    method: string
    headers: Headers
    body?: string

    constructor(url: string, options?: { method?: string; headers?: Record<string, string>; body?: string }) {
      this.url = url
      this.method = options?.method || 'GET'
      this.headers = new Headers(options?.headers)
      this.body = options?.body
    }
  }

  // @ts-expect-error - Assign global Request
  global.Request = MockRequest
}

// Test environment setup
beforeAll(() => {
  // Set essential environment variables for tests
  process.env.NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://example.com'
})
