/**
 * Breakpoint tokens for the Healthcare Chat UI Kit (Tailwind v4.1).
 *
 * Uses CSS variables for all breakpoints, matching styles.css and Tailwind v4.1 best practices.
 *
 * @example
 * // In a React component or style
 * const md = breakpoints.md; // 'var(--breakpoint-md)'
 *
 * @see https://tailwindcss.com/docs/responsive-design
 */

export type BreakpointKey = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Breakpoint values (in px)
 */
export const breakpoints: Record<BreakpointKey, string> = {
  sm: 'var(--breakpoint-sm)',   // 40rem (640px)
  md: 'var(--breakpoint-md)',   // 48rem (768px)
  lg: 'var(--breakpoint-lg)',   // 64rem (1024px)
  xl: 'var(--breakpoint-xl)',   // 80rem (1280px)
  '2xl': 'var(--breakpoint-2xl)', // 96rem (1536px)
};

/**
 * Utility: Get CSS variable for a breakpoint
 * @param key - BreakpointKey
 * @returns CSS variable string
 * @throws {Error} If an invalid breakpoint key is provided
 * @example getBreakpoint('lg') // 'var(--breakpoint-lg)'
 */
export function getBreakpoint(key: BreakpointKey): string {
  if (!(key in breakpoints)) {
    throw new Error(`Invalid breakpoint key: ${key}. Valid keys are: ${Object.keys(breakpoints).join(', ')}`);
  }
  return breakpoints[key];
}

/**
 * Tailwind-compatible breakpoints (for web)
 * Use these values in your Tailwind v4.1 classes or with style attributes.
 */
export const tailwindBreakpoints = breakpoints;

/**
 * NativeWind-compatible breakpoints (for React Native)
 * Use these values in your NativeWind config for consistent breakpoints.
 */
export const nativewindBreakpoints = breakpoints;

/**
 * Media query helpers
 */
export const mediaQueries = {
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,
}; 