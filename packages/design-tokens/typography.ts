/**
 * Typography tokens for the Healthcare Chat UI Kit (Tailwind v4.1).
 *
 * Uses CSS variables for all typography values, matching styles.css and Tailwind v4.1 best practices.
 *
 * @example
 * // In a React component
 * <div className="font-sans text-base font-bold">Hello</div>
 * // Or with style attribute
 * <div style={{ fontFamily: 'var(--font-sans)' }}>Hello</div>
 *
 * @see https://tailwindcss.com/docs/font-family
 */

export type FontFamily = 'sans' | 'serif' | 'mono';

export type FontSizeKey =
  | 'xs'
  | 'sm'
  | 'base'
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

export const typography = {
  fontFamily: {
    sans: 'var(--font-sans)',
    serif: 'var(--font-serif)',
    mono: 'var(--font-mono)',
  },
  fontSize: {
    xs: 'var(--font-size-xs)',
    sm: 'var(--font-size-sm)',
    base: 'var(--font-size-base)',
    lg: 'var(--font-size-lg)',
    xl: 'var(--font-size-xl)',
    '2xl': 'var(--font-size-2xl)',
    '3xl': 'var(--font-size-3xl)',
    '4xl': 'var(--font-size-4xl)',
    '5xl': 'var(--font-size-5xl)',
  },
  fontWeight: {
    regular: 'var(--font-weight-regular)',
    medium: 'var(--font-weight-medium)',
    semibold: 'var(--font-weight-semibold)',
    bold: 'var(--font-weight-bold)',
  },
  lineHeight: {
    none: 'var(--line-height-none)',
    tight: 'var(--line-height-tight)',
    normal: 'var(--line-height-normal)',
    relaxed: 'var(--line-height-relaxed)',
    loose: 'var(--line-height-loose)',
  },
  letterSpacing: {
    tight: 'var(--tracking-tight)',
    normal: 'var(--tracking-normal)',
    wide: 'var(--tracking-wide)',
  },
};

/**
 * Utility: Get CSS variable for font size
 * @param key - FontSizeKey
 * @returns CSS variable string
 * @example getFontSize('lg') // 'var(--font-size-lg)'
 */
export function getFontSize(key: FontSizeKey): string {
  return typography.fontSize[key];
}

/**
 * Utility: Get CSS variable for font weight
 * @param key - FontWeightKey
 * @returns CSS variable string
 * @example getFontWeight('bold') // 'var(--font-weight-bold)'
 */
export function getFontWeight(key: FontWeightKey): string {
  return typography.fontWeight[key];
}

/**
 * Utility: Get CSS variable for line height
 * @param key - LineHeightKey
 * @returns CSS variable string
 * @example getLineHeight('relaxed') // 'var(--line-height-relaxed)'
 */
export function getLineHeight(key: LineHeightKey): string {
  return typography.lineHeight[key];
}

/**
 * Utility: Get CSS variable for letter spacing
 * @param key - LetterSpacingKey
 * @returns CSS variable string
 * @example getLetterSpacing('wide') // 'var(--tracking-wide)'
 */
export function getLetterSpacing(key: LetterSpacingKey): string {
  return typography.letterSpacing[key];
}

/**
 * Tailwind-compatible typography scale (for web)
 * Use these values in your Tailwind v4.1 classes or with style attributes.
 */
export const tailwindTypography = typography;

/**
 * NativeWind-compatible typography scale (for React Native)
 * Use these values in your NativeWind config for consistent typography.
 */
export const nativewindTypography = typography;
