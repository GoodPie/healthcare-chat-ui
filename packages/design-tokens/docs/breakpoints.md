# Breakpoints

The breakpoints module provides a standardized way to handle responsive design breakpoints across the healthcare chat UI kit. It uses CSS variables for better integration with Tailwind v4 and provides type-safe access to breakpoint values.

## Overview

Breakpoints are defined as CSS variables that can be used in media queries and other responsive design patterns. This approach ensures consistency across the application and makes it easier to maintain and update breakpoint values.

## Available Breakpoints

The following breakpoints are available:

| Key | CSS Variable | Default Value | Description |
|-----|--------------|---------------|-------------|
| `xs` | `--breakpoint-xs` | `320px` | Extra small devices (phones) |
| `sm` | `--breakpoint-sm` | `640px` | Small devices (tablets) |
| `md` | `--breakpoint-md` | `768px` | Medium devices (small laptops) |
| `lg` | `--breakpoint-lg` | `1024px` | Large devices (desktops) |
| `xl` | `--breakpoint-xl` | `1280px` | Extra large devices (large desktops) |
| `2xl` | `--breakpoint-2xl` | `1536px` | 2X large devices (large screens) |

## Usage

### Accessing Breakpoint Values

```typescript
import { breakpoints, getBreakpoint } from '@healthcare-chat-ui/design-tokens';

// Get the CSS variable for a specific breakpoint
const smBreakpoint = getBreakpoint('sm'); // Returns 'var(--breakpoint-sm)'

// Access all breakpoints
const allBreakpoints = breakpoints; // Returns object with all breakpoint CSS variables
```

### Using with Media Queries

```typescript
import { mediaQueries } from '@healthcare-chat-ui/design-tokens';

// Use predefined media queries
const styles = {
  [mediaQueries.sm]: {
    // Styles for small devices and up
  },
  [mediaQueries.md]: {
    // Styles for medium devices and up
  }
};
```

### Type Safety

The module provides TypeScript types to ensure type-safe usage:

```typescript
import { BreakpointKey } from '@healthcare-chat-ui/design-tokens';

// Type-safe breakpoint key
const key: BreakpointKey = 'sm'; // Valid
const invalidKey: BreakpointKey = 'invalid'; // TypeScript error
```

## Best Practices

1. **Use CSS Variables**: Always use the provided CSS variables instead of hardcoding pixel values to maintain consistency.

2. **Type Safety**: Use the `BreakpointKey` type when working with breakpoint keys to catch errors at compile time.

3. **Media Queries**: Use the predefined `mediaQueries` object for consistent media query syntax across the application.

4. **Mobile First**: Design for mobile first and use the breakpoints to enhance the layout for larger screens.

## Integration with Tailwind

The breakpoints are designed to work seamlessly with Tailwind v4. You can use them in your Tailwind configuration:

```typescript
import { breakpoints } from '@healthcare-chat-ui/design-tokens';

export default {
  theme: {
    screens: breakpoints
  }
};
```

## Testing

The breakpoints module includes comprehensive tests to ensure:

- All required breakpoint values are present
- CSS variables are correctly formatted
- Media queries are properly constructed
- Type safety is maintained
- Error handling works as expected

Run the tests using:

```bash
yarn test packages/design-tokens/__tests__/breakpoints.test.ts
```

## Contributing

When adding or modifying breakpoints:

1. Update the breakpoints object in `breakpoints.ts`
2. Add corresponding CSS variables
3. Update the tests to cover new functionality
4. Update this documentation
5. Ensure all changes follow the mobile-first approach 