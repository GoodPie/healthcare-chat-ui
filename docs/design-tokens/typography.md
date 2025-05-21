# Typography Tokens

## Overview

The Healthcare Chat UI Kit uses a carefully designed typography system to ensure readability, accessibility, and a professional appearance across all components. This system defines font families, sizes, weights, line heights, and letter spacing for consistent typography in both web and React Native applications.

## Font Families

- **Sans-serif:** `Inter` - Used for body text and general UI elements.
- **Monospace:** `Roboto Mono` - Used for code snippets and technical content.

## Typography Scale

### Font Sizes

| Key  | Value (rem) | Pixel Equivalent | Usage                |
|------|-------------|------------------|----------------------|
| xs   | 0.75rem     | 12px             | Small text, captions |
| sm   | 0.875rem    | 14px             | Secondary text       |
| md   | 1rem        | 16px             | Body text            |
| lg   | 1.125rem    | 18px             | Subheadings          |
| xl   | 1.25rem     | 20px             | Headings             |
| 2xl  | 1.5rem      | 24px             | Large headings       |
| 3xl  | 1.875rem    | 30px             | Extra large headings |
| 4xl  | 2.25rem     | 36px             | Hero text            |
| 5xl  | 3rem        | 48px             | Display text         |

### Font Weights

| Key      | Value | Usage                |
|----------|-------|----------------------|
| regular  | 400   | Body text            |
| medium   | 500   | Emphasis             |
| semibold | 600   | Subheadings          |
| bold     | 700   | Headings             |

### Line Heights

| Key     | Value | Usage                |
|---------|-------|----------------------|
| none    | 1     | Tight spacing        |
| tight   | 1.25  | Compact text         |
| normal  | 1.5   | Body text            |
| relaxed | 1.75  | Comfortable reading  |
| loose   | 2     | Spacious text        |

### Letter Spacing

| Key    | Value    | Usage                |
|--------|----------|----------------------|
| tight  | -0.025em | Condensed text       |
| normal | 0        | Standard text        |
| wide   | 0.025em  | Expanded text        |

## Usage Guidelines

- **Consistency:** Use the same typography values for similar UI elements to maintain visual harmony.
- **Accessibility:** Ensure font sizes are at least 16px (1rem) for body text to meet WCAG 2.1 AA standards.
- **Responsive Design:** Use relative units (rem) for font sizes to scale with user preferences.
- **Hierarchy:** Use font weights and sizes to create clear visual hierarchy.

## Implementation

### Using Typography in Components

#### React (Tailwind)

```tsx
import { typography } from '@healthcare-chat-ui/design-tokens/typography';

function MyComponent() {
  return (
    <div style={{ fontFamily: typography.fontFamily.sans }}>
      <h1 style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold }}>
        Hello World
      </h1>
      <p style={{ fontSize: typography.fontSize.md, lineHeight: typography.lineHeight.normal }}>
        This is body text.
      </p>
    </div>
  );
}
```

#### React Native (NativeWind)

```tsx
import { typography } from '@healthcare-chat-ui/design-tokens/typography';

function MyComponent() {
  return (
    <View style={{ fontFamily: typography.fontFamily.sans }}>
      <Text style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold }}>
        Hello World
      </Text>
      <Text style={{ fontSize: typography.fontSize.md, lineHeight: typography.lineHeight.normal }}>
        This is body text.
      </Text>
    </View>
  );
}
```

## Accessibility Considerations

- **Font Size:** Ensure body text is at least 16px (1rem) for readability.
- **Line Height:** Use a line height of at least 1.5 for body text to improve readability.
- **Contrast:** Ensure sufficient contrast between text and background colors.
- **WCAG Compliance:** Follow WCAG 2.1 AA guidelines for typography.

## Best Practices

- **Consistency:** Stick to the defined typography scale to maintain a cohesive design.
- **Flexibility:** Use the utility functions (`getFontSize`, `getFontWeight`, etc.) to dynamically adjust typography based on context.
- **Documentation:** Always document typography decisions in component stories or documentation.

## References

- [WCAG 2.1 AA Guidelines](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.1&levels=aaa)
- [Healthcare Chat UI Kit Design Tokens](../design-tokens/README.md) 