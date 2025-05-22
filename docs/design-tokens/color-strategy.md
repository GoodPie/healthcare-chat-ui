# Color Strategy

## Overview

The Healthcare Chat UI Kit uses a carefully designed color system that prioritizes accessibility, professionalism, and medical context. Our color palette is built with WCAG 2.1 AA compliance in mind and uses CSS variables for better integration with Tailwind v4.

## Color Scales

### Primary Colors

1. **Medical** (`medical`)
   - Primary brand color representing trust and professionalism
   - Scale: 50 (lightest) to 900 (darkest)
   - Usage: Primary actions, headers, key UI elements
   - Example: `var(--color-medical-500)` for primary blue

2. **Urgent** (`urgent`)
   - Emergency and critical notifications
   - Scale: 50 to 900
   - Usage: Error states, critical alerts, emergency messages
   - Example: `var(--color-urgent-500)` for urgent red

3. **Success** (`success`)
   - Positive states and confirmations
   - Scale: 50 to 900
   - Usage: Success messages, completed actions
   - Example: `var(--color-success-500)` for success green

4. **Warning** (`warning`)
   - Caution and attention states
   - Scale: 50 to 900
   - Usage: Warnings, pending actions
   - Example: `var(--color-warning-500)` for warning yellow

5. **Neutral** (`neutral`)
   - UI elements and text
   - Scale: 50 to 900
   - Usage: Backgrounds, borders, text
   - Example: `var(--color-neutral-500)` for neutral gray

### Semantic Colors

Semantic colors provide context-specific meaning:

```typescript
semantic: {
  info: 'var(--color-semantic-info)',      // Information messages
  success: 'var(--color-semantic-success)', // Success messages
  warning: 'var(--color-semantic-warning)', // Warning messages
  error: 'var(--color-semantic-error)',     // Error messages
  disabled: 'var(--color-semantic-disabled)', // Disabled state
  focus: 'var(--color-semantic-focus)',     // Focus ring
  overlay: 'var(--color-semantic-overlay)', // Modal overlays
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
   - Use medical for primary actions
   - Reserve urgent for critical information
   - Use success for completed actions
   - Apply warning for attention-requiring states

3. **Contrast**
   - Ensure sufficient contrast between text and background
   - Use the color scale to maintain readability
   - Test color combinations with color contrast checkers

## Implementation

### Using Colors in Components

```tsx
// Using Tailwind classes (preferred)
<div className="bg-medical-500 text-white">
  Primary Action
</div>

// Using CSS variables directly
<div style={{ 
  backgroundColor: 'var(--color-medical-500)',
  color: 'var(--color-white)'
}}>
  Primary Action
</div>

// Using utility functions
import { getColor, getSemanticColor } from '@healthcare-chat-ui/design-tokens'

<div style={{ 
  backgroundColor: getColor('medical', '500'),
  color: getSemanticColor('info')
}}>
  Primary Action
</div>
```

### Color Utilities

```typescript
import { getColor, getSemanticColor } from '@healthcare-chat-ui/design-tokens'

// Get a specific color
const primaryBlue = getColor('medical', '500')

// Get a semantic color
const errorColor = getSemanticColor('error')
```

## Theme Integration

Colors are integrated into our theming system using Tailwind v4's CSS variable approach. This allows for:

1. **Dynamic Updates**: Colors can be updated at runtime using CSS variables
2. **Dark Mode**: Automatic dark mode support through CSS variable overrides
3. **High Contrast**: Easy implementation of high contrast themes
4. **Performance**: Better performance through CSS variable usage

## Dark Mode Support

Our color system fully supports dark mode through CSS variables and Tailwind's dark mode variant. We provide two approaches:

### 1. System Preference (Default)

The default implementation respects the user's system preferences:

```css
/* Light mode (default) */
:root {
  --color-medical-500: oklch(0.667 0.295 322.15);
  --color-urgent-500: oklch(0.591 0.293 322.896);
  --color-success-500: oklch(0.667 0.295 142.15);
  --color-warning-500: oklch(0.667 0.295 48.15);
  --color-neutral-500: oklch(0.667 0.295 0);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-medical-500: oklch(0.591 0.293 322.896);
    --color-urgent-500: oklch(0.667 0.295 322.15);
    --color-success-500: oklch(0.591 0.293 142.896);
    --color-warning-500: oklch(0.591 0.293 48.896);
    --color-neutral-500: oklch(0.591 0.293 0);
  }
}
```

### 2. Manual Toggle

For applications that need manual dark mode control:

```typescript
// Theme toggle utility
function toggleDarkMode(isDark: boolean) {
  document.documentElement.classList.toggle('dark', isDark)
  localStorage.setItem('theme', isDark ? 'dark' : 'light')
}

// Initialize theme
function initializeTheme() {
  const isDark = localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  toggleDarkMode(isDark)
}
```

```css
/* Manual dark mode */
:root {
  --color-medical-500: oklch(0.667 0.295 322.15);
  /* ... other light mode colors ... */
}

.dark {
  --color-medical-500: oklch(0.591 0.293 322.896);
  /* ... other dark mode colors ... */
}
```

### Dark Mode Best Practices

1. **Color Adjustments**
   - Reduce contrast in dark mode to prevent eye strain
   - Use slightly desaturated colors for better readability
   - Maintain color meaning across modes

2. **Component Usage**
   ```tsx
   // Using Tailwind's dark variant
   <div className="bg-medical-500 dark:bg-medical-600 text-white dark:text-medical-50">
     Primary Action
   </div>

   // Using CSS variables
   <div style={{ 
     backgroundColor: 'var(--color-medical-500)',
     color: 'var(--color-white)'
   }}>
     Primary Action
   </div>
   ```

## High Contrast Support

Our color system supports high contrast mode through the `forced-colors` media query and semantic color mapping:

### 1. System High Contrast

```css
@media (forced-colors: active) {
  :root {
    /* Semantic color mapping */
    --color-medical-500: CanvasText;
    --color-urgent-500: Mark;
    --color-success-500: ButtonText;
    --color-warning-500: Mark;
    --color-neutral-500: CanvasText;
    
    /* Semantic colors */
    --color-semantic-info: CanvasText;
    --color-semantic-success: ButtonText;
    --color-semantic-warning: Mark;
    --color-semantic-error: Mark;
    --color-semantic-disabled: GrayText;
    --color-semantic-focus: Highlight;
    --color-semantic-overlay: Canvas;
  }
}
```

### 2. Custom High Contrast Theme

For applications that need custom high contrast support:

```css
.high-contrast {
  --color-medical-500: #000000;
  --color-urgent-500: #ff0000;
  --color-success-500: #008000;
  --color-warning-500: #ffa500;
  --color-neutral-500: #000000;
  
  /* Semantic colors */
  --color-semantic-info: #0000ff;
  --color-semantic-success: #008000;
  --color-semantic-warning: #ffa500;
  --color-semantic-error: #ff0000;
  --color-semantic-disabled: #808080;
  --color-semantic-focus: #ff0000;
  --color-semantic-overlay: #ffffff;
}
```

### High Contrast Best Practices

1. **Color Selection**
   - Use maximum contrast ratios (21:1)
   - Avoid color combinations that cause eye strain
   - Maintain clear visual hierarchy

2. **Component Usage**
   ```tsx
   // Using Tailwind's forced-colors variant
   <div className="bg-medical-500 forced-colors:bg-[CanvasText] text-white forced-colors:text-[Canvas]">
     Primary Action
   </div>

   // Using CSS variables
   <div style={{ 
     backgroundColor: 'var(--color-medical-500)',
     color: 'var(--color-white)'
   }}>
     Primary Action
   </div>
   ```

3. **Testing**
   - Test with Windows High Contrast mode
   - Verify color contrast ratios
   - Ensure text remains readable
   - Check focus indicators

## Theme Switching

To support all theme modes (light, dark, high contrast), use our theme switching utility:

```typescript
type ThemeMode = 'light' | 'dark' | 'high-contrast'

function setThemeMode(mode: ThemeMode) {
  const root = document.documentElement
  
  // Remove all theme classes
  root.classList.remove('dark', 'high-contrast')
  
  // Apply selected theme
  if (mode === 'dark') {
    root.classList.add('dark')
  } else if (mode === 'high-contrast') {
    root.classList.add('high-contrast')
  }
  
  // Save preference
  localStorage.setItem('theme-mode', mode)
}

// Initialize theme
function initializeTheme() {
  const savedMode = localStorage.getItem('theme-mode') as ThemeMode
  if (savedMode) {
    setThemeMode(savedMode)
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setThemeMode('dark')
  }
}
```

## References

- [Tailwind v4 Color Documentation](https://tailwindcss.com/docs/customizing-colors)
- [WCAG 2.1 Color Contrast Guidelines](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.1#contrast-minimum)
- [CSS Color Module Level 4](https://www.w3.org/TR/css-color-4/)
- [Tailwind Dark Mode Documentation](https://tailwindcss.com/docs/dark-mode)
- [High Contrast Mode Guidelines](https://www.w3.org/WAI/WCAG21/Techniques/css/C29)

## Mobile Support

For React Native applications, we provide HSL color values through the `nativewindColors` export. These values are automatically converted to the appropriate format for mobile platforms.

```typescript
import { nativewindColors } from '@healthcare-chat-ui/design-tokens'

// Using in React Native
<View style={{ backgroundColor: nativewindColors.medical[500] }}>
  <Text>Primary Action</Text>
</View>
``` 