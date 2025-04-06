## Authentication

Authentication uses MFID OAuth, managed server-side via `/api/auth/mfid/*` routes. User sessions use `iron-session` to store tokens securely in encrypted cookies.

## Client vs Server Services

### Client Services (`/client`)

- Run in the browser (use in `'use client'` components).
- Make API requests to the server.
- Handle client-side data mutations and state.

```tsx
'use client'
import { createPost } from '@/services/client/posts'
// ...
await createPost(formData)
```

### Server Services (`/server`)

- Run on the server (Server Components, API routes).
- Access databases or other backend resources directly.
- Implement server-side business logic.

```tsx
// Server component
import { getPosts } from '@/services/server/posts'

export default async function PostsPage() {
  const posts = await getPosts()
  // ... render posts
}
```

## Core Utilities (`/core`)

Contains shared utilities like the base HTTP client (`api.ts`), session helpers (`session.ts`), request interceptors (`interceptors.ts`), and error handling (`error-handler.ts`).

## Key Practices

- Keep client and server code strictly separated.
- Use TypeScript for type safety.
- Implement proper error handling in service functions.
