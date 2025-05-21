# Spacing Tokens

## Overview

The Healthcare Chat UI Kit uses a 4px base scale for spacing to ensure consistency, accessibility, and a professional appearance across all components. This scale is designed to be flexible, scalable, and easy to use in both web and React Native applications.

## Spacing Scale

| Key  | Value (px) | Description                |
|------|------------|----------------------------|
| none | 0          | No spacing                 |
| xxs  | 2          | Extra extra small spacing  |
| xs   | 4          | Extra small spacing        |
| sm   | 8          | Small spacing              |
| md   | 16         | Medium spacing             |
| lg   | 24         | Large spacing              |
| xl   | 32         | Extra large spacing        |
| 2xl  | 40         | 2x extra large spacing     |
| 3xl  | 56         | 3x extra large spacing     |
| 4xl  | 72         | 4x extra large spacing     |

## Usage Guidelines

- **Consistency:** Use the same spacing value for similar UI elements to maintain visual harmony.
- **Accessibility:** Ensure touch targets are at least 44x44px (11 units on our scale) for better accessibility.
- **Responsive Design:** Use relative units (e.g., `rem` or `em`) in CSS to scale spacing with font size.
- **Component Spacing:** Use `md` (16px) for standard component padding and `lg` (24px) for section spacing.

## Implementation

### Using Spacing in Components

#### React (Tailwind)

```tsx
import { spacing } from '@healthcare-chat-ui/design-tokens/spacing';

function MyComponent() {
  return (
    <div style={{ padding: spacing.md }}>
      <p style={{ marginBottom: spacing.sm }}>Hello World</p>
    </div>
  );
}
```

#### React Native (NativeWind)

```tsx
import { spacing } from '@healthcare-chat-ui/design-tokens/spacing';

function MyComponent() {
  return (
    <View style={{ padding: spacing.md }}>
      <Text style={{ marginBottom: spacing.sm }}>Hello World</Text>
    </View>
  );
}
```

## Accessibility Considerations

- **Touch Targets:** Ensure interactive elements have sufficient spacing (at least 44x44px) for touch accessibility.
- **Visual Hierarchy:** Use spacing to create clear visual hierarchy and improve readability.
- **WCAG Compliance:** Follow WCAG 2.1 AA guidelines for spacing in layouts and components.

## Best Practices

- **Consistency:** Stick to the defined spacing scale to maintain a cohesive design.
- **Flexibility:** Use the `getSpacing` utility function to dynamically adjust spacing based on context.
- **Documentation:** Always document spacing decisions in component stories or documentation.

## References

- [WCAG 2.1 AA Guidelines](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.1&levels=aaa)
- [Healthcare Chat UI Kit Design Tokens](../design-tokens/README.md) 