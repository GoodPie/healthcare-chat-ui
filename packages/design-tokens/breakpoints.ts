/**
 * Breakpoint tokens for the Healthcare Chat UI Kit.
 *
 * Defines responsive breakpoints for consistent layout across different screen sizes.
 *
 * @remarks
 * - All breakpoints are in pixels (px).
 * - Follows WCAG 2.1 guidelines for responsive design.
 * - Designed for use with both React (Tailwind) and React Native (NativeWind).
 *
 * @example
 * import { breakpoints } from '@healthcare-chat-ui/design-tokens/breakpoints';
 * const isMobile = window.innerWidth < breakpoints.sm; // true if width < 640px
 */

export type BreakpointKey = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Breakpoint values (in px)
 */
export const breakpoints: Record<BreakpointKey, string> = {
  sm: '640px',   // Small devices (phones)
  md: '768px',   // Medium devices (tablets)
  lg: '1024px',  // Large devices (laptops)
  xl: '1280px',  // Extra large devices (desktops)
  '2xl': '1536px', // 2x extra large devices (large desktops)
};

/**
 * Utility: Get breakpoint value by key
 * @param key - The breakpoint key
 * @returns The breakpoint value in px
 * @example
 * getBreakpoint('lg') // '1024px'
 */
export function getBreakpoint(key: BreakpointKey): string {
  return breakpoints[key];
}

/**
 * Tailwind-compatible breakpoint scale (for web)
 *
 * @remarks
 * Use these values in your Tailwind config for consistent breakpoints.
 */
export const tailwindBreakpoints = breakpoints;

/**
 * NativeWind-compatible breakpoint scale (for React Native)
 *
 * @remarks
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