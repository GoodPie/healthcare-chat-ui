# Theme Usage Guide

## Overview

The Healthcare Chat UI Kit provides a flexible theming system that supports light, dark, and high-contrast modes. The theme system is designed to be accessible, customizable, and easy to implement in both web and mobile applications.

## Available Themes

1. **Light Theme** (Default)
   - Clean, professional appearance
   - High readability
   - Suitable for well-lit environments

2. **Dark Theme**
   - Reduced eye strain
   - Lower brightness
   - Suitable for low-light environments

3. **High Contrast Theme**
   - Maximum contrast ratios
   - WCAG 2.1 AAA compliance
   - Suitable for users with visual impairments

## Implementation

### Web Applications

```tsx
import { ThemeProvider, useTheme } from '@healthcare-chat-ui/design-tokens/themes'

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <YourApp />
    </ThemeProvider>
  )
}

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  
  return (
    <select 
      value={theme} 
      onChange={(e) => setTheme(e.target.value as ThemeName)}
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="high-contrast">High Contrast</option>
    </select>
  )
}
```

### React Native Applications

```tsx
import { 
  ThemeProviderNative, 
  useTheme, 
  getThemeStyles 
} from '@healthcare-chat-ui/design-tokens/themes'

function App() {
  return (
    <ThemeProviderNative defaultTheme="light">
      <YourApp />
    </ThemeProviderNative>
  )
}

function ThemedComponent() {
  const { theme } = useTheme()
  const styles = getThemeStyles(theme)
  
  return (
    <View style={styles.background}>
      <Text style={styles.foreground}>
        Hello World
      </Text>
    </View>
  )
}
```

## Theme Persistence

The theme system automatically persists the user's theme preference:

- **Web**: Uses `localStorage` to save theme preference
- **Mobile**: Uses `AsyncStorage` to save theme preference

## Customizing Themes

### Extending Existing Themes

```typescript
import { themes } from '@healthcare-chat-ui/design-tokens/themes'

const customTheme = {
  ...themes.light,
  colors: {
    ...themes.light.colors,
    primary: 'your-custom-color',
    // Add other custom colors
  }
}
```

### Creating New Themes

```typescript
import { type ThemeConfig } from '@healthcare-chat-ui/design-tokens/themes'

const newTheme: ThemeConfig = {
  name: 'custom-theme',
  colors: {
    background: '#ffffff',
    foreground: '#000000',
    primary: '#your-primary-color',
    secondary: '#your-secondary-color',
    accent: '#your-accent-color',
    muted: '#your-muted-color',
    mutedForeground: '#your-muted-foreground-color',
    border: '#your-border-color',
    input: '#your-input-color',
    ring: '#your-ring-color',
    error: '#your-error-color',
    success: '#your-success-color',
    warning: '#your-warning-color',
    info: '#your-info-color',
  },
  shadows: {
    sm: 'your-shadow-sm',
    md: 'your-shadow-md',
    lg: 'your-shadow-lg',
  }
}
```

## Theme Properties

Each theme includes the following properties:

### Colors
- `background`: Main background color
- `foreground`: Main text color
- `primary`: Primary action color
- `secondary`: Secondary action color
- `accent`: Accent color for highlights
- `muted`: Muted background color
- `mutedForeground`: Muted text color
- `border`: Border color
- `input`: Input field color
- `ring`: Focus ring color
- `error`: Error state color
- `success`: Success state color
- `warning`: Warning state color
- `info`: Information state color

### Shadows
- `sm`: Small shadow for subtle elevation
- `md`: Medium shadow for moderate elevation
- `lg`: Large shadow for significant elevation

## Best Practices

1. **Theme Switching**
   - Provide a clear way to switch themes
   - Remember user preferences
   - Support system theme preferences when possible

2. **Accessibility**
   - Ensure all themes meet WCAG 2.1 AA standards
   - Test color combinations for contrast
   - Don't rely solely on color to convey information

3. **Performance**
   - Use CSS variables for theme values
   - Minimize theme switching overhead
   - Cache theme styles when possible

4. **Consistency**
   - Maintain consistent color relationships across themes
   - Use semantic color names
   - Follow the established color scale

## Testing Themes

```typescript
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@healthcare-chat-ui/design-tokens/themes'

test('renders with light theme', () => {
  render(
    <ThemeProvider defaultTheme="light">
      <YourComponent />
    </ThemeProvider>
  )
  // Add your theme-specific assertions
})

test('renders with dark theme', () => {
  render(
    <ThemeProvider defaultTheme="dark">
      <YourComponent />
    </ThemeProvider>
  )
  // Add your theme-specific assertions
})
```

## Troubleshooting

### Common Issues

1. **Theme Not Persisting**
   - Check if storage is available
   - Verify storage key is consistent
   - Ensure theme changes are properly saved

2. **Inconsistent Colors**
   - Verify CSS variables are properly set
   - Check for conflicting styles
   - Ensure theme provider is properly mounted

3. **Performance Issues**
   - Minimize theme switching
   - Use memoization for theme-dependent components
   - Avoid unnecessary re-renders

For more information about the color system, see the [Color Strategy Documentation](./color-strategy.md). 