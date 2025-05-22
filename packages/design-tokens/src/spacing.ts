/**
 * Spacing tokens for the Healthcare Chat UI Library.
 *
 * Uses a 4px base scale for consistency and accessibility across all components.
 *
 * @remarks
 * - All spacing values are in rem units for better accessibility and scaling.
 * - Designed for use with both React (Tailwind) and React Native (NativeWind).
 * - Follows WCAG 2.1 AA guidelines for touch targets and visual clarity.
 *
 * @example
 * import { spacing } from '@healthcare-chat-ui/design-tokens/spacing';
 * const padding = spacing.md; // 1rem
 */

export type SpacingKey =
  | '0'
  | 'px'
  | '0.5'
  | '1'
  | '1.5'
  | '2'
  | '2.5'
  | '3'
  | '3.5'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '14'
  | '16'
  | '20'
  | '24'
  | '28'
  | '32'
  | '36'
  | '40'
  | '44'
  | '48'
  | '52'
  | '56'
  | '60'
  | '64'
  | '72'
  | '80'
  | '96';

/**
 * Spacing scale values (in rem)
 */
export const spacing: Record<SpacingKey, string> = {
  '0': '0rem',
  'px': '1px',
  '0.5': '0.125rem',
  '1': '0.25rem',
  '1.5': '0.375rem',
  '2': '0.5rem',
  '2.5': '0.625rem',
  '3': '0.75rem',
  '3.5': '0.875rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '7': '1.75rem',
  '8': '2rem',
  '9': '2.25rem',
  '10': '2.5rem',
  '11': '2.75rem',
  '12': '3rem',
  '14': '3.5rem',
  '16': '4rem',
  '20': '5rem',
  '24': '6rem',
  '28': '7rem',
  '32': '8rem',
  '36': '9rem',
  '40': '10rem',
  '44': '11rem',
  '48': '12rem',
  '52': '13rem',
  '56': '14rem',
  '60': '15rem',
  '64': '16rem',
  '72': '18rem',
  '80': '20rem',
  '96': '24rem',
};

/**
 * Utility: Get spacing value by key
 * @param key - The spacing key
 * @returns The spacing value in rem
 * @example
 * getSpacing('6') // '1.5rem'
 */
export function getSpacing(key: SpacingKey): string {
  return spacing[key];
}

/**
 * Tailwind-compatible spacing scale (for web)
 *
 * @remarks
 * Use these values in your Tailwind config for consistent spacing.
 */
export const tailwindSpacing = spacing;

/**
 * NativeWind-compatible spacing scale (for React Native)
 *
 * @remarks
 * Use these values in your NativeWind config for consistent spacing.
 */
export const nativewindSpacing = spacing;
