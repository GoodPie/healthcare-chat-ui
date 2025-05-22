/**
 * Transition tokens for the Healthcare Chat UI Kit
 * Following WCAG 2.1 guidelines for motion and animation
 */

export type TransitionKey = 'none' | 'fast' | 'normal' | 'slow';

export const transitions: Record<TransitionKey, string> = {
  none: 'none',
  fast: '150ms',    // Quick interactions
  normal: '300ms',  // Standard transitions
  slow: '500ms',    // Complex animations
};

/**
 * Get transition duration by key
 */
export const getTransition = (key: TransitionKey): string => transitions[key];

/**
 * Common transition timing functions
 */
export const timingFunctions = {
  linear: 'linear',
  ease: 'ease',
  'ease-in': 'ease-in',
  'ease-out': 'ease-out',
  'ease-in-out': 'ease-in-out',
};

/**
 * Common transition properties
 */
export const properties = {
  all: 'all',
  colors: 'color, background-color, border-color',
  opacity: 'opacity',
  transform: 'transform',
  shadow: 'box-shadow',
};

/**
 * Tailwind-compatible transition scale
 */
export const transitionScale = {
  none: 'transition-none',
  fast: 'transition-fast',
  normal: 'transition-normal',
  slow: 'transition-slow',
};

/**
 * NativeWind-compatible transition scale
 */
export const transitionScaleNative = {
  none: 'transition-none',
  fast: 'transition-fast',
  normal: 'transition-normal',
  slow: 'transition-slow',
}; 