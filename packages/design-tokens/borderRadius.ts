/**
 * Border radius tokens for the Healthcare Chat UI Kit
 * Following WCAG 2.1 guidelines for interactive elements
 */

export type BorderRadiusKey = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export const borderRadius: Record<BorderRadiusKey, string> = {
  none: '0',
  sm: '0.125rem',    // 2px - For subtle elements
  md: '0.25rem',     // 4px - Default for most components
  lg: '0.5rem',      // 8px - For cards and larger elements
  xl: '0.75rem',     // 12px - For modals and dialogs
  '2xl': '1rem',     // 16px - For large containers
  full: '9999px',    // For pills and circular elements
};

/**
 * Get border radius value by key
 */
export const getBorderRadius = (key: BorderRadiusKey): string => borderRadius[key];

/**
 * Tailwind-compatible border radius scale
 */
export const borderRadiusScale = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
};

/**
 * NativeWind-compatible border radius scale
 */
export const borderRadiusScaleNative = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
}; 