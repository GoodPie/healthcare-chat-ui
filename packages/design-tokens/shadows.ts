/**
 * Shadow tokens for the Healthcare Chat UI Kit
 * Following WCAG 2.1 guidelines for visual hierarchy and depth
 */

export type ShadowKey = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner';

export const shadows: Record<ShadowKey, string> = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',      // Subtle elevation
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',  // Default elevation
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', // Elevated components
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', // High elevation
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)', // Maximum elevation
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)', // Inset shadow
};

/**
 * Get shadow value by key
 */
export const getShadow = (key: ShadowKey): string => shadows[key];

/**
 * Tailwind-compatible shadow scale
 */
export const shadowScale = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
  inner: 'shadow-inner',
};

/**
 * NativeWind-compatible shadow scale
 */
export const shadowScaleNative = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
  inner: 'shadow-inner',
}; 