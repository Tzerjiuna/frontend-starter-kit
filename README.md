# Frontend Starter Kit

A modern frontend starter kit built with Next.js, TypeScript, and Material-UI.

## Features

- ⚡️ Next.js 14 with App Router
- 🎨 Material-UI (MUI) for UI components
- 📱 Responsive design
- 🔒 Authentication with JWT
- 📊 Data fetching with React Query
- 🎯 TypeScript for type safety
- 🧪 Jest for testing
- 📝 Storybook for component documentation
- 🎨 Tailwind CSS for styling
- 🔍 ESLint and Prettier for code quality
- 🚀 GitHub Actions for CI/CD

## Getting Started

### Prerequisites

- Node.js 18.x or later
- yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/frontend-starter-kit.git
cd frontend-starter-kit
```

2. Install dependencies:
```bash
yarn install
```

3. Create a `.env.local` file in the root directory and add your environment variables:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

4. Start the development server:
```bash
yarn dev
```

5. Run linters and formatters before committing or creating a pull request:
```bash
yarn lf
```
This command ensures your code adheres to the project's style guidelines.

## Project Structure

```
src/
├── app/                    # Next.js app directory
├── components/            # Reusable components
│   ├── ui/               # UI components
│   └── layout/           # Layout components
├── services/             # API services
│   ├── api/             # API clients
│   └── core/            # Core services
├── hooks/               # Custom hooks
├── utils/               # Utility functions
├── types/               # TypeScript types
├── styles/              # Global styles
└── tests/               # Test files and configuration
```

## Development

### Code Style

- ESLint for linting
- Prettier for formatting
- TypeScript for type checking

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
