/**
 * Breakpoint tokens for the Healthcare Chat UI Kit
 * Following WCAG 2.1 guidelines for responsive design and accessibility
 */

export type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export const breakpoints: Record<BreakpointKey, string> = {
  xs: '320px',   // Small mobile devices
  sm: '640px',   // Large mobile devices
  md: '768px',   // Tablets
  lg: '1024px',  // Small laptops
  xl: '1280px',  // Large laptops
  '2xl': '1536px', // Desktop monitors
};

/**
 * Get breakpoint value by key
 */
export const getBreakpoint = (key: BreakpointKey): string => breakpoints[key];

/**
 * Tailwind-compatible breakpoint scale
 */
export const breakpointScale = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  '2xl': '2xl',
};

/**
 * NativeWind-compatible breakpoint scale
 */
export const breakpointScaleNative = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  '2xl': '2xl',
};

/**
 * Media query helpers
 */
export const mediaQueries = {
  xs: `@media (min-width: ${breakpoints.xs})`,
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,
}; 