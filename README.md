# ts-node-template

A starter template for TypeScript + Node.js projects.

## Features

- **TypeScript** with strict configuration
- **ESLint** (flat config) + **Prettier** for linting and formatting
- **Vitest** for testing
- **tsx** for development with hot-reload
- **Husky** + **lint-staged** for pre-commit hooks
- **dotenv** for environment variables

## Getting Started

```bash
# Install dependencies
npm install

# Development with hot-reload
npm run dev

# Build
npm run build

# Run production build
npm start
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development with hot-reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run compiled project |
| `npm test` | Run tests |
| `npm run test:coverage` | Run tests with coverage |
| `npm run lint` | Lint code with ESLint |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |

## Environment Variables

Copy `.env.example` to `.env` and fill in required values:

```bash
cp .env.example .env
```

## Requirements

- Node.js >= 20.0.0
