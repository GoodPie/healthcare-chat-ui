# Healthcare Chat UI Kit - Core Package

This package provides shared utilities, hooks, and types for building healthcare chat interfaces. It serves as a foundation for the Healthcare Chat UI Kit, providing common functionality that can be used across different platforms (React and React Native).

## Purpose

The core package is designed to:

1. **Provide shared types** - TypeScript definitions for design tokens, component props, and other shared interfaces
2. **Offer utility functions** - Common functions for string manipulation, date formatting, and other operations
3. **Implement platform-agnostic hooks** - React hooks that work across different platforms
4. **Define constants** - Shared constants and configuration values

## Usage

### Installation

The core package is typically used as a dependency of other packages in the Healthcare Chat UI Kit. If you're using the CLI to add components to your project, you don't need to install it directly.

However, if you want to use it in your own project:

```bash
npm install @healthcare-chat/core
# or
yarn add @healthcare-chat/core
```

### Importing

```typescript
// Import types
import type { DesignTokens, Colors } from '@healthcare-chat/core';

// Import utilities
import { truncateText, formatMessagePreview } from '@healthcare-chat/core';

// Import hooks
import { useMessageFormatter } from '@healthcare-chat/core';
```

## Available Utilities

### String Utilities

- `truncateText(text: string, maxLength: number): string` - Truncates a string to a specified length
- `formatMessagePreview(message: string, maxLength?: number): string` - Formats a message preview
- `sanitizeText(text: string): string` - Sanitizes text for safe display
- `formatPatientName(firstName: string, lastName: string, middleName?: string): string` - Formats a patient name

## Available Hooks

### useMessageFormatter

A hook for formatting messages in healthcare chat applications.

```typescript
const { createPreview, formatMessage } = useMessageFormatter({
  previewLength: 50,
  sanitize: true,
  formatMarkdown: true
});

// Create a preview of a message
const preview = createPreview('This is a **message** with [markdown](https://example.com)');

// Format a full message
const formatted = formatMessage('This is a **message** with [markdown](https://example.com)');
```

## Types

The core package provides TypeScript definitions for design tokens and other shared interfaces. These types are used throughout the Healthcare Chat UI Kit to ensure type safety and consistency.

```typescript
// Design token types
import type { 
  Colors, 
  Typography, 
  Spacing, 
  BorderRadius,
  Shadows,
  Transitions,
  ZIndex,
  Breakpoints,
  DesignTokens
} from '@healthcare-chat/core';
```
