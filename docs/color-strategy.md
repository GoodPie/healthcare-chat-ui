# Color Strategy

## Overview

The Healthcare Chat UI Kit uses a carefully designed color system that prioritizes accessibility, professionalism, and medical context. Our color palette is built with WCAG 2.1 AA compliance in mind and uses HSL color values for better manipulation and consistency.

## Color Scales

### Primary Colors

1. **Medical Blue** (`medical-blue`)
   - Primary brand color representing trust and professionalism
   - Scale: 50 (lightest) to 900 (darkest)
   - Usage: Primary actions, headers, key UI elements
   - Example: `hsl(210, 100%, 50%)` for primary blue

2. **Urgent Red** (`urgent-red`)
   - Emergency and critical notifications
   - Scale: 50 to 900
   - Usage: Error states, critical alerts, emergency messages
   - Example: `hsl(0, 100%, 50%)` for urgent red

3. **Success Green** (`success-green`)
   - Positive states and confirmations
   - Scale: 50 to 900
   - Usage: Success messages, completed actions
   - Example: `hsl(142, 100%, 50%)` for success green

4. **Warning Yellow** (`warning-yellow`)
   - Caution and attention states
   - Scale: 50 to 900
   - Usage: Warnings, pending actions
   - Example: `hsl(48, 100%, 50%)` for warning yellow

5. **Neutral** (`neutral`)
   - UI elements and text
   - Scale: 50 to 900
   - Usage: Backgrounds, borders, text
   - Example: `hsl(0, 0%, 50%)` for neutral gray

### Semantic Colors

Semantic colors provide context-specific meaning:

```typescript
semantic: {
  info: 'hsl(210, 100%, 50%)',      // Information messages
  success: 'hsl(142, 100%, 50%)',    // Success messages
  warning: 'hsl(48, 100%, 50%)',     // Warning messages
  error: 'hsl(0, 100%, 50%)',        // Error messages
  disabled: 'hsl(0, 0%, 70%)',       // Disabled state
  focus: 'hsl(210, 100%, 50%)',      // Focus ring
  overlay: 'hsla(0, 0%, 0%, 0.5)',   // Modal overlays
}
```

## Usage Guidelines

### Color Scale Usage

- **50-100**: Backgrounds, hover states
- **200-300**: Borders, dividers
- **400-500**: Primary actions, important text
- **600-700**: Secondary actions
- **800-900**: Headers, important text

### Accessibility

- All color combinations meet WCAG 2.1 AA standards
- Minimum contrast ratio of 4.5:1 for normal text
- Minimum contrast ratio of 3:1 for large text
- Color is never used as the sole means of conveying information

### Best Practices

1. **Consistency**
   - Use the same color for the same type of information
   - Maintain consistent color relationships across the application

2. **Context**
   - Use medical blue for primary actions
   - Reserve urgent red for critical information
   - Use success green for completed actions
   - Apply warning yellow for attention-requiring states

3. **Contrast**
   - Ensure sufficient contrast between text and background
   - Use the color scale to maintain readability
   - Test color combinations with color contrast checkers

## Implementation

### Using Colors in Components

```tsx
// Using Tailwind classes
<div className="bg-medical-blue-500 text-white">
  Primary Action
</div>

// Using CSS variables
<div style={{ 
  backgroundColor: 'var(--medical-blue-500)',
  color: 'var(--white)'
}}>
  Primary Action
</div>
```

### Color Utilities

```typescript
import { getColor, getSemanticColor } from '@healthcare-chat-ui/design-tokens'

// Get a specific color
const primaryBlue = getColor('medical-blue', '500')

// Get a semantic color
const errorColor = getSemanticColor('error')
```

## Theme Integration

Colors are integrated into our theming system, allowing for different color schemes in light, dark, and high-contrast modes. See the [Theme Documentation](./theme-usage.md) for details on theme implementation and customization. 