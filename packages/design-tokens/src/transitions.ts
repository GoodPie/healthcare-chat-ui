/**
 * Transition tokens for the Healthcare Chat UI Kit
 * Following WCAG 2.1 guidelines for motion and animation
 * Compatible with Tailwind v4's new features
 */

export type TransitionKey = '75' | '100' | '150' | '200' | '300' | '500' | '700' | '1000';

export const transitions = {
  duration: {
    '75': 'var(--transition-duration-75)',
    '100': 'var(--transition-duration-100)',
    '150': 'var(--transition-duration-150)',
    '200': 'var(--transition-duration-200)',
    '300': 'var(--transition-duration-300)',
    '500': 'var(--transition-duration-500)',
    '700': 'var(--transition-duration-700)',
    '1000': 'var(--transition-duration-1000)',
  },
  timingFunction: {
    linear: 'var(--transition-timing-linear)',
    in: 'var(--transition-timing-in)',
    out: 'var(--transition-timing-out)',
    'in-out': 'var(--transition-timing-in-out)',
    discrete: 'var(--transition-timing-discrete)',
  },
  default: 'var(--transition-default)',
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
  colors: 'color, background-color, border-color, text-decoration-color, fill, stroke',
  opacity: 'opacity',
  transform: 'transform',
  shadow: 'box-shadow',
  filter: 'filter',
  backdrop: 'backdrop-filter',
};

/**
 * Tailwind-compatible transition scale
 */
export const transitionScale = {
  none: 'transition-none',
  fast: 'transition-fast',
  normal: 'transition-normal',
  slow: 'transition-slow',
  discrete: 'transition-discrete',
};

/**
 * NativeWind-compatible transition scale
 */
export const transitionScaleNative = {
  none: 'transition-none',
  fast: 'transition-fast',
  normal: 'transition-normal',
  slow: 'transition-slow',
  discrete: 'transition-discrete',
};

/**
 * Starting style variants for Tailwind v4
 * Used with @starting-style feature
 */
export const startingStyles = {
  opacity: 'starting:opacity-0',
  scale: 'starting:scale-95',
  translate: 'starting:translate-y-2',
  rotate: 'starting:rotate-12',
  blur: 'starting:blur-sm',
};

/**
 * Transition utilities for Tailwind v4
 */
export const transitionUtilities = {
  // Base transitions
  all: 'transition-all',
  colors: 'transition-colors',
  opacity: 'transition-opacity',
  transform: 'transition-transform',
  shadow: 'transition-shadow',
  filter: 'transition-filter',
  backdrop: 'transition-backdrop',
  
  // Duration utilities
  duration: {
    '75': 'duration-75',
    '100': 'duration-100',
    '150': 'duration-150',
    '200': 'duration-200',
    '300': 'duration-300',
    '500': 'duration-500',
    '700': 'duration-700',
    '1000': 'duration-1000',
  },
  
  // Timing function utilities
  timing: {
    linear: 'ease-linear',
    in: 'ease-in',
    out: 'ease-out',
    'in-out': 'ease-in-out',
    discrete: 'steps(1)',
  },
  
  // Delay utilities
  delay: {
    '75': 'delay-75',
    '100': 'delay-100',
    '150': 'delay-150',
    '200': 'delay-200',
    '300': 'delay-300',
    '500': 'delay-500',
    '700': 'delay-700',
    '1000': 'delay-1000',
  },
}; 