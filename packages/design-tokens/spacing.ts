/**
 * Spacing tokens for the Healthcare Chat UI Library.
 *
 * Uses a 4px base scale for consistency and accessibility across all components.
 *
 * @remarks
 * - All spacing values are in pixels (px).
 * - Designed for use with both React (Tailwind) and React Native (NativeWind).
 * - Follows WCAG 2.1 AA guidelines for touch targets and visual clarity.
 *
 * @example
 * import { spacing } from '@healthcare-chat-ui/design-tokens/spacing';
 * const padding = spacing.md; // 16
 */

export type SpacingKey =
  | 'none'
  | 'xxs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl';

/**
 * Spacing scale values (in px)
 */
export const spacing: Record<SpacingKey, number> = {
  none: 0,
  xxs: 2,   // Extra extra small (2px)
  xs: 4,    // Extra small (4px)
  sm: 8,    // Small (8px)
  md: 16,   // Medium (16px)
  lg: 24,   // Large (24px)
  xl: 32,   // Extra large (32px)
  '2xl': 40, // 2x extra large (40px)
  '3xl': 56, // 3x extra large (56px)
  '4xl': 72, // 4x extra large (72px)
};

/**
 * Utility: Get spacing value by key
 * @param key - The spacing key
 * @returns The spacing value in px
 * @example
 * getSpacing('lg') // 24
 */
export function getSpacing(key: SpacingKey): number {
  return spacing[key];
}

/**
 * Tailwind-compatible spacing scale (for web)
 *
 * @remarks
 * Use these values in your Tailwind config for consistent spacing.
 */
export const tailwindSpacing = {
  '0': '0px',
  '0.5': '2px',
  '1': '4px',
  '2': '8px',
  '4': '16px',
  '6': '24px',
  '8': '32px',
  '10': '40px',
  '14': '56px',
  '18': '72px',
};

/**
 * NativeWind-compatible spacing scale (for React Native)
 *
 * @remarks
 * Use these values in your NativeWind config for consistent spacing.
 */
export const nativewindSpacing = tailwindSpacing;
