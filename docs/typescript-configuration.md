# TypeScript Configuration Guidelines

This document outlines the TypeScript configuration standards used across the Healthcare Chat UI Kit monorepo. These configurations ensure type safety, consistency, and optimal developer experience across all packages.

## Core Principles

Our TypeScript configurations follow these core principles:

1. **Strict Type Checking**: All packages use strict type checking to catch potential issues at compile time.
2. **Consistent Module Format**: We use ESNext module format across all packages for better tree-shaking and future compatibility.
3. **Declaration Files**: All packages generate declaration files to provide proper TypeScript support when consumed.
4. **Appropriate Target**: We target ES2020 for modern JavaScript features while maintaining broad compatibility.
5. **Path Aliases**: We use path aliases for cleaner imports within each package.

## Package-Specific Configurations

### Core Package

The core package provides shared utilities and types used by other packages. Its configuration includes:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "declaration": true,
    "outDir": "dist",
    "rootDir": ".",
    "baseUrl": ".",
    "jsx": "react-jsx",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*", "types/**/*", "hooks/**/*", "utils/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.test.tsx"]
}
```

Key features:
- Includes DOM library for browser APIs
- Supports JSX for React components
- Includes all source directories (src, types, hooks, utils)

### UI Package

The UI package contains React components and requires JSX support:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "outDir": "./dist",
    "rootDir": "./src",
    "baseUrl": ".",
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": true,
    "declaration": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.test.tsx"]
}
```

### CLI and Registry Packages

These Node.js packages don't require DOM or JSX support:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "baseUrl": ".",
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "declaration": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

### Design Tokens Package

The design tokens package has a slightly different configuration to support its specific needs:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "declaration": true,
    "outDir": "dist",
    "rootDir": ".",
    "baseUrl": ".",
    "paths": {
      "*": ["node_modules/*"]
    }
  },
  "include": ["**/*.ts"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

Key differences:
- Different paths configuration for its specific import needs
- Includes all TypeScript files in the package root

## Storybook App Configuration

The Storybook app uses TypeScript project references to split its configuration:

1. **tsconfig.json**: References the app and node configurations
2. **tsconfig.app.json**: Configuration for the React application code
3. **tsconfig.node.json**: Configuration for Node.js code (like Vite config)

This separation allows for different settings appropriate to each context.

## Best Practices

When working with TypeScript in this project:

1. **Maintain Strict Mode**: Don't disable strict type checking or its individual flags.
2. **Use Path Aliases**: Use the configured path aliases for cleaner imports.
3. **Generate Declarations**: Ensure declaration files are generated for all packages.
4. **Consistent Naming**: Use consistent casing for compiler options (e.g., "ESNext" not "esnext").
5. **Appropriate Libraries**: Include only the necessary library definitions for each package.

## Troubleshooting

If you encounter TypeScript compilation issues:

1. Check that your imports use the correct path aliases
2. Ensure you're not using features beyond the specified target
3. Verify that all dependencies have proper type definitions
4. Run `yarn tsc --noEmit` to check for type errors without generating output
