/**
 * Shadow tokens for the Healthcare Chat UI Kit.
 *
 * Defines elevation levels for consistent depth across the application.
 *
 * @remarks
 * - All shadow values are in CSS box-shadow format.
 * - Follows WCAG 2.1 guidelines for visual hierarchy.
 * - Designed for use with both React (Tailwind) and React Native (NativeWind).
 *
 * @example
 * import { shadows } from '@healthcare-chat-ui/design-tokens/shadows';
 * const cardShadow = shadows.md; // '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
 */

export type ShadowKey = 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | 'inner';

/**
 * Shadow values
 */
export const shadows: Record<ShadowKey, string> = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 2px 4px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.05)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 12px 24px -6px rgba(0, 0, 0, 0.1), 0 6px 12px -3px rgba(0, 0, 0, 0.05), 0 3px 6px -1px rgba(0, 0, 0, 0.05)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
};

/**
 * Utility: Get shadow value by key
 * @param key - The shadow key
 * @returns The shadow value
 * @example
 * getShadow('md') // '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
 */
export function getShadow(key: ShadowKey): string {
  return shadows[key];
}

/**
 * Tailwind-compatible shadow scale (for web)
 *
 * @remarks
 * Use these values in your Tailwind config for consistent shadows.
 */
export const shadowScale = shadows;

/**
 * NativeWind-compatible shadow scale (for React Native)
 *
 * @remarks
 * Use these values in your NativeWind config for consistent shadows.
 */
export const shadowScaleNative = shadows; 