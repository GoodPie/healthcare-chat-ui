/**
 * Typography tokens for the Healthcare Chat UI Kit.
 *
 * Defines font families, sizes, line heights, weights, and letter spacing for consistent typography across the application.
 *
 * @remarks
 * - Font families: 'Inter' for body text, 'Roboto Mono' for monospace.
 * - Font sizes are in rem units for better accessibility and scaling.
 * - Line heights are unitless for better inheritance.
 * - Font weights range from 400 (regular) to 700 (bold).
 * - Letter spacing is in em units for relative scaling.
 *
 * @example
 * import { typography } from '@healthcare-chat-ui/design-tokens/typography';
 * const fontSize = typography.fontSize.md; // 1rem
 */

export type FontFamily = 'sans' | 'mono';

export type FontSizeKey =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl';

export type FontWeightKey =
  | 'regular'
  | 'medium'
  | 'semibold'
  | 'bold';

export type LineHeightKey =
  | 'none'
  | 'tight'
  | 'normal'
  | 'relaxed'
  | 'loose';

export type LetterSpacingKey =
  | 'tight'
  | 'normal'
  | 'wide';

export const fontFamily: Record<FontFamily, string> = {
  sans: 'Inter, sans-serif',
  mono: 'Roboto Mono, monospace',
};

export const fontSize: Record<FontSizeKey, string> = {
  xs: '0.75rem',   // 12px
  sm: '0.875rem',  // 14px
  md: '1rem',      // 16px
  lg: '1.125rem',  // 18px
  xl: '1.25rem',   // 20px
  '2xl': '1.5rem', // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem',  // 36px
  '5xl': '3rem',     // 48px
};

export const fontWeight: Record<FontWeightKey, number> = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

export const lineHeight: Record<LineHeightKey, number> = {
  none: 1,
  tight: 1.25,
  normal: 1.5,
  relaxed: 1.75,
  loose: 2,
};

export const letterSpacing: Record<LetterSpacingKey, string> = {
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
};

/**
 * Utility: Get typography value by key
 * @param key - The typography key
 * @returns The typography value
 * @example
 * getFontSize('lg') // '1.125rem'
 */
export function getFontSize(key: FontSizeKey): string {
  return fontSize[key];
}

export function getFontWeight(key: FontWeightKey): number {
  return fontWeight[key];
}

export function getLineHeight(key: LineHeightKey): number {
  return lineHeight[key];
}

export function getLetterSpacing(key: LetterSpacingKey): string {
  return letterSpacing[key];
}

/**
 * Tailwind-compatible typography scale (for web)
 *
 * @remarks
 * Use these values in your Tailwind config for consistent typography.
 */
export const tailwindTypography = {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
};

/**
 * NativeWind-compatible typography scale (for React Native)
 *
 * @remarks
 * Use these values in your NativeWind config for consistent typography.
 */
export const nativewindTypography = tailwindTypography;
