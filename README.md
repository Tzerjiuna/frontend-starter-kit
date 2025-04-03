# Frontend Starter Kit

A modern Next.js frontend starter kit with React, TypeScript, Tailwind CSS, and Ant Design.

## Getting Started

```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── actions/      # Server Actions for data operations
├── api/          # API resource modules by domain
├── app/          # Next.js App Router pages and layouts
├── components/   # Reusable UI components
├── lib/          # Core utilities, helpers, and services
├── hooks/        # Custom React hooks
├── i18n/         # Internationalization
├── types/        # TypeScript type definitions
└── styles/       # Global styles
```

Key directories:
- `app/` - Organized by feature using Next.js App Router
- `api/` - Domain-specific API modules
- `components/` - Reusable UI building blocks
- `lib/` - Core utilities and services

## Code Standards and Best Practices

### React Components

**Key Principles:**
- Functional components with hooks
- Single Responsibility Principle
- Strong TypeScript typing for props
- Composition over inheritance
- Small, reusable components

### Data Fetching

**Best Practices:**
- Server Components for initial data loading
- SWR/React Query for client-side fetching
- Proper loading and error states
- Type-safe response handling

### State Management

**Approach:**
- Local state with useState/useReducer
- Context API for shared state
- Zustand for complex state requirements
- Avoid prop drilling

### UI and Styling

**Guidelines:**
- Tailwind CSS for component styling
- Component-specific modules for complex styles
- Responsive design patterns
- Accessible UI components (WCAG compliant)

### Testing

**Strategy:**
- Unit tests for utilities and hooks
- Component tests with React Testing Library
- Integration tests for key user flows
- "Testing Trophy" approach prioritizing integration tests

## Available Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Development server |
| `yarn build` | Production build |
| `yarn start` | Production server |
| `yarn lint` | Run linter |
| `yarn lf` | Fix linting and formatting issues |
| `yarn test` | Run tests |
| `yarn test-all` | Run all pre-deployment checks |

## Learn More

- [Next.js](https://nextjs.org/docs) - The React framework
- [React](https://react.dev) - UI library
- [TypeScript](https://www.typescriptlang.org/docs) - Typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS
- [Ant Design](https://ant.design/docs/react/introduce) - UI component library

## API Architecture

This project uses a flexible API architecture that supports both Server-Side Rendering (SSR) and Client-Side Rendering (CSR).

### Data Fetching Patterns

**Server Components:**
- Direct imports from resource modules
- Automatic mocking support
- Type-safe responses with proper error handling

**Client Components:**
- React hooks (SWR) for data fetching
- Loading and error states handled automatically
- Client-side caching for performance

**Data Mutations:**
- Direct API calls for simple mutations
- Server Actions for complex operations
- Automatic revalidation via `router.refresh()`

### API Mocking System

**Key Features:**
- Toggle with `NEXT_PUBLIC_USE_MOCK_API=true` in `.env`
- Resource-specific mock handlers in `src/lib/mocks/`
- Transparent usage in both SSR and CSR contexts

### Best Practices

1. **Resource Isolation:** Domain-specific API modules
2. **Type Safety:** Strongly typed requests and responses
3. **Error Handling:** Consistent patterns across the application
4. **Testing:** Mock-enabled architecture for reliable tests

## Data Flow Architecture: Authentication and Post Domain Examples

This project implements a dual-mode data flow architecture combining Server-Side Rendering (SSR) and Client-Side Rendering (CSR).

### Authentication Flow

**Key Concepts:**
- Protected routes managed via middleware
- Iron Session for secure cookie-based session management
- OAuth 2.0 flow with MFID (external identity provider)
- Automatic redirection for unauthenticated users

### Post Domain Data Flow

**Server Components (SSR):**
- Server-rendered pages (`/post`, `/post/[id]`) fetch data during rendering
- Data fetching via server actions with automatic mocking support
- Server components pass data down to client components as props

**Client Components (CSR):**
- Interactive UI elements (`PostForm.tsx`, `PostTable.tsx`) handle user interactions 
- Data mutations via fetch API or direct API function calls
- Use of `router.refresh()` to maintain data consistency after mutations

### Key Benefits

1. **Performance & SEO:** Fast initial loads with server-rendered content
2. **Development:** Integrated mocking system and type safety
3. **User Experience:** Rich interactive UI with server-data consistency 
4. **Maintenance:** Clear separation between data fetching and UI logic

This architecture provides a streamlined approach to building full-featured interactive applications while maintaining excellent performance and developer experience.
