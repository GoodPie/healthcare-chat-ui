# Shadows

The shadows module provides a standardized way to handle shadows, text shadows, and drop shadows across the healthcare chat UI kit. It's designed to work seamlessly with Tailwind v4 and follows WCAG 2.1 guidelines for visual hierarchy.

## Overview

Shadows are defined using CSS variables for better integration with Tailwind v4. This approach ensures consistency across the application and makes it easier to maintain and update shadow values.

## Available Shadows

### Box Shadows

| Key | CSS Variable | Value | Description |
|-----|--------------|-------|-------------|
| `none` | `--shadow-none` | `none` | No shadow |
| `sm` | `--shadow-sm` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | Subtle shadow for small elements |
| `base` | `--shadow-base` | `0 2px 4px 0 rgb(0 0 0 / 0.05)` | Base shadow for most elements |
| `md` | `--shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1)` | Medium shadow for cards |
| `lg` | `--shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1)` | Large shadow for elevated elements |
| `xl` | `--shadow-xl` | `0 20px 25px -5px rgb(0 0 0 / 0.1)` | Extra large shadow for modals |
| `2xl` | `--shadow-2xl` | `0 25px 50px -12px rgb(0 0 0 / 0.25)` | Double extra large shadow for overlays |
| `inner` | `--shadow-inner` | `inset 0 2px 4px 0 rgb(0 0 0 / 0.05)` | Inner shadow for pressed states |

### Text Shadows

| Key | CSS Variable | Value | Description |
|-----|--------------|-------|-------------|
| `none` | `--text-shadow-none` | `none` | No text shadow |
| `2xs` | `--text-shadow-2xs` | `0 1px 1px rgb(0 0 0 / 0.05)` | Ultra-subtle text shadow |
| `xs` | `--text-shadow-xs` | `0 1px 2px rgb(0 0 0 / 0.1)` | Extra small text shadow |
| `sm` | `--text-shadow-sm` | `0 2px 4px rgb(0 0 0 / 0.1)` | Small text shadow |
| `md` | `--text-shadow-md` | `0 4px 8px rgb(0 0 0 / 0.1)` | Medium text shadow |
| `lg` | `--text-shadow-lg` | `0 8px 16px rgb(0 0 0 / 0.1)` | Large text shadow |

### Drop Shadows

| Key | CSS Variable | Value | Description |
|-----|--------------|-------|-------------|
| `none` | `--drop-shadow-none` | `none` | No drop shadow |
| `sm` | `--drop-shadow-sm` | `drop-shadow(0 1px 1px rgb(0 0 0 / 0.05))` | Small drop shadow |
| `md` | `--drop-shadow-md` | `drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))` | Medium drop shadow |
| `lg` | `--drop-shadow-lg` | `drop-shadow(0 10px 8px rgb(0 0 0 / 0.1))` | Large drop shadow |
| `xl` | `--drop-shadow-xl` | `drop-shadow(0 20px 13px rgb(0 0 0 / 0.1))` | Extra large drop shadow |
| `2xl` | `--drop-shadow-2xl` | `drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))` | Double extra large drop shadow |

### Colored Shadows

| Key | CSS Variable | Value | Description |
|-----|--------------|-------|-------------|
| `medical` | `--shadow-medical` | `0 4px 6px -1px var(--color-medical-500 / 0.1)` | Medical blue shadow |
| `urgent` | `--shadow-urgent` | `0 4px 6px -1px var(--color-urgent-500 / 0.1)` | Urgent red shadow |
| `success` | `--shadow-success` | `0 4px 6px -1px var(--color-success-500 / 0.1)` | Success green shadow |
| `warning` | `--shadow-warning` | `0 4px 6px -1px var(--color-warning-500 / 0.1)` | Warning yellow shadow |
| `neutral` | `--shadow-neutral` | `0 4px 6px -1px var(--color-neutral-500 / 0.1)` | Neutral gray shadow |

## Usage

### Basic Shadows

```typescript
import { shadows, getShadow } from '@healthcare-chat-ui/design-tokens';

// Get the CSS variable for a specific shadow
const cardShadow = getShadow('md'); // Returns 'var(--shadow-md)'

// Use the shadow directly
const modalShadow = shadows.xl; // Returns 'var(--shadow-xl)'
```

### Text Shadows

```typescript
import { textShadows } from '@healthcare-chat-ui/design-tokens';

// Apply text shadow to headings
const headingStyle = {
  textShadow: textShadows.md,
};
```

### Drop Shadows

```typescript
import { dropShadows } from '@healthcare-chat-ui/design-tokens';

// Apply drop shadow to images
const imageStyle = {
  filter: dropShadows.lg,
};
```

### Colored Shadows

```typescript
import { shadowUtilities } from '@healthcare-chat-ui/design-tokens';

// Apply colored shadow to medical alerts
const alertStyle = {
  boxShadow: shadowUtilities.color.medical,
};
```

### Using with Tailwind v4

```typescript
import { shadowUtilities } from '@healthcare-chat-ui/design-tokens';

// Example component with shadows
const styles = {
  // Box shadow
  boxShadow: shadowUtilities.box.md,
  
  // Text shadow
  textShadow: shadowUtilities.text.sm,
  
  // Drop shadow
  filter: shadowUtilities.drop.lg,
  
  // Colored shadow
  shadowColor: shadowUtilities.color.medical,
};
```

## Best Practices

1. **Use CSS Variables**: Always use the provided CSS variables instead of hardcoding values to maintain consistency.

2. **Type Safety**: Use the `ShadowKey` type when working with shadow keys to catch errors at compile time.

3. **Visual Hierarchy**: Use shadows to create clear visual hierarchy:
   - Use `sm` and `base` for interactive elements
   - Use `md` and `lg` for cards and elevated surfaces
   - Use `xl` and `2xl` for modals and overlays

4. **Text Shadows**: Use text shadows sparingly and only for important headings or text that needs to stand out against busy backgrounds.

5. **Drop Shadows**: Use drop shadows for images and complex elements where a box shadow might not provide the desired effect.

6. **Colored Shadows**: Use colored shadows to reinforce the semantic meaning of elements (e.g., medical alerts, warning messages).

## Integration with Tailwind

The shadows are designed to work seamlessly with Tailwind v4. You can use them in your Tailwind configuration:

```typescript
import { shadowUtilities } from '@healthcare-chat-ui/design-tokens';

export default {
  theme: {
    extend: {
      boxShadow: shadowUtilities.box,
      textShadow: shadowUtilities.text,
      dropShadow: shadowUtilities.drop,
    }
  }
};
```

## Testing

The shadows module includes comprehensive tests to ensure:

- All required shadow values are present
- CSS variables are correctly formatted
- Shadow utilities are complete
- Type safety is maintained

Run the tests using:

```bash
yarn test packages/design-tokens/__tests__/shadows.test.ts
```

## Contributing

When adding or modifying shadows:

1. Update the shadow objects in `shadows.ts`
2. Add corresponding CSS variables in `styles.css`
3. Update the tests to cover new functionality
4. Update this documentation
5. Ensure all changes follow WCAG 2.1 guidelines for visual hierarchy 