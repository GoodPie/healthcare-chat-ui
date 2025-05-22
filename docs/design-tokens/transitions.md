# Transitions

The transitions module provides a standardized way to handle animations and transitions across the healthcare chat UI kit. It's designed to work seamlessly with Tailwind v4 and follows WCAG 2.1 guidelines for motion and animation.

## Overview

Transitions are defined using CSS variables for better integration with Tailwind v4. This approach ensures consistency across the application and makes it easier to maintain and update transition values.

## Available Transitions

### Durations

| Key | CSS Variable | Value | Description |
|-----|--------------|-------|-------------|
| `75` | `--transition-duration-75` | `75ms` | Ultra-fast transitions |
| `100` | `--transition-duration-100` | `100ms` | Very fast transitions |
| `150` | `--transition-duration-150` | `150ms` | Fast transitions |
| `200` | `--transition-duration-200` | `200ms` | Quick transitions |
| `300` | `--transition-duration-300` | `300ms` | Standard transitions |
| `500` | `--transition-duration-500` | `500ms` | Slow transitions |
| `700` | `--transition-duration-700` | `700ms` | Very slow transitions |
| `1000` | `--transition-duration-1000` | `1000ms` | Ultra-slow transitions |

### Timing Functions

| Key | CSS Variable | Value | Description |
|-----|--------------|-------|-------------|
| `linear` | `--transition-timing-linear` | `linear` | Linear timing |
| `in` | `--transition-timing-in` | `cubic-bezier(0.4, 0, 1, 1)` | Ease-in timing |
| `out` | `--transition-timing-out` | `cubic-bezier(0, 0, 0.2, 1)` | Ease-out timing |
| `in-out` | `--transition-timing-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Ease-in-out timing |
| `discrete` | `--transition-timing-discrete` | `steps(1)` | Discrete steps timing |

## Usage

### Basic Transitions

```typescript
import { transitions, getTransition } from '@healthcare-chat-ui/design-tokens';

// Get the CSS variable for a specific duration
const fastTransition = getTransition('100'); // Returns 'var(--transition-duration-100)'

// Use the default transition
const defaultTransition = transitions.default; // Returns 'var(--transition-default)'
```

### Using with Tailwind v4

```typescript
import { transitionUtilities } from '@healthcare-chat-ui/design-tokens';

// Example component with transitions
const styles = {
  // Base transition
  transition: transitionUtilities.all,
  
  // Duration
  duration: transitionUtilities.duration['300'],
  
  // Timing function
  timing: transitionUtilities.timing['in-out'],
  
  // Delay
  delay: transitionUtilities.delay['100'],
};
```

### Starting Styles

The module includes support for Tailwind v4's `@starting-style` feature:

```typescript
import { startingStyles } from '@healthcare-chat-ui/design-tokens';

// Example component with starting styles
const styles = {
  // Fade in
  opacity: startingStyles.opacity,
  
  // Scale up
  scale: startingStyles.scale,
  
  // Slide up
  translate: startingStyles.translate,
};
```

### Transition Properties

```typescript
import { properties } from '@healthcare-chat-ui/design-tokens';

// Common transition properties
const transitionProps = {
  all: properties.all,
  colors: properties.colors,
  opacity: properties.opacity,
  transform: properties.transform,
  shadow: properties.shadow,
  filter: properties.filter,
  backdrop: properties.backdrop,
};
```

## Best Practices

1. **Use CSS Variables**: Always use the provided CSS variables instead of hardcoding values to maintain consistency.

2. **Type Safety**: Use the `TransitionKey` type when working with transition keys to catch errors at compile time.

3. **Starting Styles**: Use the `startingStyles` for enter/exit animations with the `@starting-style` feature.

4. **Discrete Transitions**: Use the `discrete` timing function for step-based animations.

5. **Performance**: Keep transitions short (under 300ms) for interactive elements to maintain responsiveness.

## Integration with Tailwind

The transitions are designed to work seamlessly with Tailwind v4. You can use them in your Tailwind configuration:

```typescript
import { transitionUtilities } from '@healthcare-chat-ui/design-tokens';

export default {
  theme: {
    extend: {
      transitionDuration: transitionUtilities.duration,
      transitionTimingFunction: transitionUtilities.timing,
      transitionDelay: transitionUtilities.delay,
    }
  }
};
```

## Testing

The transitions module includes comprehensive tests to ensure:

- All required transition values are present
- CSS variables are correctly formatted
- Starting styles are properly defined
- Transition utilities are complete
- Type safety is maintained

Run the tests using:

```bash
yarn test packages/design-tokens/__tests__/transitions.test.ts
```

## Contributing

When adding or modifying transitions:

1. Update the transitions object in `transitions.ts`
2. Add corresponding CSS variables in `styles.css`
3. Update the tests to cover new functionality
4. Update this documentation
5. Ensure all changes follow WCAG 2.1 guidelines for motion 