/**
 * Transition tokens for the Healthcare Chat UI Kit
 * Following WCAG 2.1 guidelines for motion and animation
 */

export type TransitionKey = '75' | '100' | '150' | '200' | '300' | '500' | '700' | '1000';

export const transitions = {
  duration: {
    '75': '75ms',
    '100': '100ms',
    '150': '150ms',
    '200': '200ms',
    '300': '300ms',
    '500': '500ms',
    '700': '700ms',
    '1000': '1000ms',
  },
  timingFunction: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  default: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
};

/**
 * Get transition duration by key
 */
export function getTransition(key: TransitionKey): string {
  return transitions.duration[key];
}

/**
 * Common transition timing functions
 */
export const timingFunctions = transitions.timingFunction;

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