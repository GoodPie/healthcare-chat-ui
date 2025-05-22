/**
 * Shadow tokens for the Healthcare Chat UI Kit.
 *
 * Defines elevation levels for consistent depth across the application.
 * Compatible with Tailwind v4's new features including colored shadows,
 * text shadows, and drop shadows.
 *
 * @remarks
 * - All shadow values use CSS variables for better integration
 * - Follows WCAG 2.1 guidelines for visual hierarchy
 * - Designed for use with both React (Tailwind) and React Native (NativeWind)
 *
 * @example
 * import { shadows } from '@healthcare-chat-ui/design-tokens/shadows';
 * const cardShadow = shadows.md; // 'var(--shadow-md)'
 */

export type ShadowKey = 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | 'inner';

/**
 * Shadow values using CSS variables
 */
export const shadows: Record<ShadowKey, string> = {
  none: 'var(--shadow-none)',
  sm: 'var(--shadow-sm)',
  base: 'var(--shadow-base)',
  md: 'var(--shadow-md)',
  lg: 'var(--shadow-lg)',
  xl: 'var(--shadow-xl)',
  '2xl': 'var(--shadow-2xl)',
  inner: 'var(--shadow-inner)',
};

/**
 * Utility: Get shadow value by key
 * @param key - The shadow key
 * @returns The shadow value
 * @example
 * getShadow('md') // 'var(--shadow-md)'
 */
export function getShadow(key: ShadowKey): string {
  return shadows[key];
}

/**
 * Text shadow values for Tailwind v4
 */
export const textShadows = {
  none: 'none',
  '2xs': 'var(--text-shadow-2xs)',
  xs: 'var(--text-shadow-xs)',
  sm: 'var(--text-shadow-sm)',
  md: 'var(--text-shadow-md)',
  lg: 'var(--text-shadow-lg)',
};

/**
 * Drop shadow values for Tailwind v4
 */
export const dropShadows = {
  none: 'none',
  sm: 'var(--drop-shadow-sm)',
  md: 'var(--drop-shadow-md)',
  lg: 'var(--drop-shadow-lg)',
  xl: 'var(--drop-shadow-xl)',
  '2xl': 'var(--drop-shadow-2xl)',
};

/**
 * Shadow utilities for Tailwind v4
 */
export const shadowUtilities = {
  // Box shadows
  box: {
    none: 'shadow-none',
    sm: 'shadow-sm',
    base: 'shadow-base',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
    inner: 'shadow-inner',
  },
  
  // Text shadows
  text: {
    none: 'text-shadow-none',
    '2xs': 'text-shadow-2xs',
    xs: 'text-shadow-xs',
    sm: 'text-shadow-sm',
    md: 'text-shadow-md',
    lg: 'text-shadow-lg',
  },
  
  // Drop shadows
  drop: {
    none: 'drop-shadow-none',
    sm: 'drop-shadow-sm',
    md: 'drop-shadow-md',
    lg: 'drop-shadow-lg',
    xl: 'drop-shadow-xl',
    '2xl': 'drop-shadow-2xl',
  },
  
  // Colored shadows
  color: {
    medical: 'shadow-medical',
    urgent: 'shadow-urgent',
    success: 'shadow-success',
    warning: 'shadow-warning',
    neutral: 'shadow-neutral',
  },
};

/**
 * Tailwind-compatible shadow scale (for web)
 */
export const shadowScale = shadows;

/**
 * NativeWind-compatible shadow scale (for React Native)
 */
export const shadowScaleNative = shadows; 