# Design Tokens

This document outlines the design tokens used in the Healthcare Chat UI Kit, following WCAG 2.1 guidelines for accessibility and best practices for design systems.

## Overview

Design tokens are the fundamental building blocks of our design system, representing the smallest reusable elements of design that can be consistently applied across the product. They serve as a bridge between design and development, ensuring that design decisions are implemented consistently across various platforms.

## Token Categories

### Colors
- Primary colors for brand identity
- Semantic colors for states and feedback
- Accessibility-focused color contrast ratios
- Dark mode support
- High contrast mode support

[View Color Documentation](./color-strategy.md)

### Typography
- Font families (Inter for body text, Roboto Mono for monospace)
- Font sizes (16px minimum for body text)
- Font weights (400-700 range)
- Line heights (1.5 for body text)
- Letter spacing
- Responsive type scales

[View Typography Documentation](./typography.md)

### Spacing
- 4px base scale
- Consistent spacing ratios
- Responsive spacing adjustments
- Component-specific spacing

[View Spacing Documentation](./spacing.md)

### Border Radius
- Subtle to pronounced options
- Consistent with component hierarchy
- Accessibility considerations for interactive elements
- Mobile-friendly touch targets

### Shadows
- Elevation hierarchy
- Subtle to pronounced options
- Consistent with component hierarchy
- Reduced motion support

### Transitions
- Duration scales (fast, normal, slow)
- Timing functions
- Reduced motion support
- Performance considerations

### Z-Index
- Layering system
- Modal and dialog management
- Focus management
- Accessibility considerations

### Breakpoints
- Mobile-first approach
- Common device sizes
- Responsive design support
- Touch-friendly considerations

## Accessibility Considerations

### Color
- Minimum contrast ratio of 4.5:1 for normal text
- Minimum contrast ratio of 3:1 for large text
- Color not used as the sole means of conveying information
- Support for color blindness

### Typography
- Minimum font size of 16px for body text
- Line height of at least 1.5 for body text
- Support for text scaling up to 200%
- Clear visual hierarchy

### Motion
- Respect user's reduced motion preferences
- No flashing or strobing effects
- Appropriate timing for animations
- Clear focus indicators

### Touch Targets
- Minimum size of 44x44 pixels
- Adequate spacing between interactive elements
- Clear visual feedback
- Support for different input methods

## Implementation

### Web (React)
```tsx
import { colors, typography, spacing } from '@healthcare-chat/ui-kit/design-tokens';

const styles = {
  container: {
    backgroundColor: colors.background.primary,
    padding: spacing.md,
    fontFamily: typography.fontFamily.body,
  },
};
```

### React Native
```tsx
import { colors, typography, spacing } from '@healthcare-chat/ui-kit/design-tokens';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
    padding: spacing.md,
    fontFamily: typography.fontFamily.body,
  },
});
```

## Best Practices

1. **Consistency**
   - Use tokens instead of hardcoded values
   - Maintain consistent naming conventions
   - Follow the established scale

2. **Accessibility**
   - Test with screen readers
   - Verify color contrast
   - Support keyboard navigation
   - Respect user preferences

3. **Performance**
   - Optimize animations
   - Minimize layout shifts
   - Use appropriate timing functions
   - Consider mobile performance

4. **Maintenance**
   - Document changes
   - Version control
   - Regular audits
   - Update documentation

## References

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Design Tokens Best Practices](https://medium.com/nyc-design/mastering-design-tokens-d492cdd92720)
- [Accessibility Best Practices for Design Systems](https://www.linkedin.com/pulse/accessibility-best-practices-design-systems-ernesto-lago-nnsdf/) 