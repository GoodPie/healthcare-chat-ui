/**
 * Color tokens for the Healthcare Chat UI Kit
 * 
 * This module provides type-safe access to our color system, including:
 * - Color scales (medical, urgent, success, warning, neutral)
 * - Semantic colors (info, success, warning, error, etc.)
 * - Dark mode support
 * - High contrast mode support
 * 
 * @example
 * // Using in React components
 * import { getColor, getSemanticColor } from '@healthcare-chat-ui/design-tokens'
 * 
 * function Button() {
 *   return (
 *     <button style={{ 
 *       backgroundColor: getColor('medical', '500'),
 *       color: getSemanticColor('info')
 *     }}>
 *       Click me
 *     </button>
 *   )
 * }
 */

// Color scale types
export type ColorScale = 'medical' | 'urgent' | 'success' | 'warning' | 'neutral'
export type ColorShade = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
export type SemanticColor = 'info' | 'success' | 'warning' | 'error' | 'disabled' | 'focus' | 'overlay'

// Color scale definitions using CSS variables
export const colorScales: Record<ColorScale, Record<ColorShade, string>> = {
  medical: {
    '50': 'var(--color-medical-50)',
    '100': 'var(--color-medical-100)',
    '200': 'var(--color-medical-200)',
    '300': 'var(--color-medical-300)',
    '400': 'var(--color-medical-400)',
    '500': 'var(--color-medical-500)',
    '600': 'var(--color-medical-600)',
    '700': 'var(--color-medical-700)',
    '800': 'var(--color-medical-800)',
    '900': 'var(--color-medical-900)',
  },
  urgent: {
    '50': 'var(--color-urgent-50)',
    '100': 'var(--color-urgent-100)',
    '200': 'var(--color-urgent-200)',
    '300': 'var(--color-urgent-300)',
    '400': 'var(--color-urgent-400)',
    '500': 'var(--color-urgent-500)',
    '600': 'var(--color-urgent-600)',
    '700': 'var(--color-urgent-700)',
    '800': 'var(--color-urgent-800)',
    '900': 'var(--color-urgent-900)',
  },
  success: {
    '50': 'var(--color-success-50)',
    '100': 'var(--color-success-100)',
    '200': 'var(--color-success-200)',
    '300': 'var(--color-success-300)',
    '400': 'var(--color-success-400)',
    '500': 'var(--color-success-500)',
    '600': 'var(--color-success-600)',
    '700': 'var(--color-success-700)',
    '800': 'var(--color-success-800)',
    '900': 'var(--color-success-900)',
  },
  warning: {
    '50': 'var(--color-warning-50)',
    '100': 'var(--color-warning-100)',
    '200': 'var(--color-warning-200)',
    '300': 'var(--color-warning-300)',
    '400': 'var(--color-warning-400)',
    '500': 'var(--color-warning-500)',
    '600': 'var(--color-warning-600)',
    '700': 'var(--color-warning-700)',
    '800': 'var(--color-warning-800)',
    '900': 'var(--color-warning-900)',
  },
  neutral: {
    '50': 'var(--color-neutral-50)',
    '100': 'var(--color-neutral-100)',
    '200': 'var(--color-neutral-200)',
    '300': 'var(--color-neutral-300)',
    '400': 'var(--color-neutral-400)',
    '500': 'var(--color-neutral-500)',
    '600': 'var(--color-neutral-600)',
    '700': 'var(--color-neutral-700)',
    '800': 'var(--color-neutral-800)',
    '900': 'var(--color-neutral-900)',
  },
}

// Semantic color definitions
export const semanticColors: Record<SemanticColor, string> = {
  info: 'var(--color-semantic-info)',
  success: 'var(--color-semantic-success)',
  warning: 'var(--color-semantic-warning)',
  error: 'var(--color-semantic-error)',
  disabled: 'var(--color-semantic-disabled)',
  focus: 'var(--color-semantic-focus)',
  overlay: 'var(--color-semantic-overlay)',
}

/**
 * Get a color value from a color scale
 * @param scale - The color scale to use
 * @param shade - The shade of the color
 * @returns The CSS variable reference for the color
 * @throws Error if the scale or shade is invalid
 */
export function getColor(scale: ColorScale, shade: ColorShade): string {
  if (!colorScales[scale]) {
    throw new Error(`Invalid color scale: ${scale}`)
  }
  if (!colorScales[scale][shade]) {
    throw new Error(`Invalid color shade: ${shade} for scale: ${scale}`)
  }
  return colorScales[scale][shade]
}

/**
 * Get a semantic color value
 * @param color - The semantic color to use
 * @returns The CSS variable reference for the semantic color
 * @throws Error if the semantic color is invalid
 */
export function getSemanticColor(color: SemanticColor): string {
  if (!semanticColors[color]) {
    throw new Error(`Invalid semantic color: ${color}`)
  }
  return semanticColors[color]
}

/**
 * Tailwind-compatible color scales for web usage
 * These are used by the Tailwind plugin to generate utility classes
 */
export const tailwindColors = {
  medical: colorScales.medical,
  urgent: colorScales.urgent,
  success: colorScales.success,
  warning: colorScales.warning,
  neutral: colorScales.neutral,
  semantic: semanticColors,
}

/**
 * NativeWind-compatible color scales for mobile usage
 * These are used by the NativeWind plugin to generate styles
 */
export const nativewindColors = {
  medical: {
    '50': 'oklch(0.98 0.02 322.15)',
    '100': 'oklch(0.95 0.04 322.15)',
    '200': 'oklch(0.90 0.08 322.15)',
    '300': 'oklch(0.85 0.12 322.15)',
    '400': 'oklch(0.75 0.20 322.15)',
    '500': 'oklch(0.667 0.295 322.15)', // Primary brand color
    '600': 'oklch(0.60 0.25 322.15)',
    '700': 'oklch(0.55 0.22 322.15)',
    '800': 'oklch(0.50 0.20 322.15)',
    '900': 'oklch(0.45 0.18 322.15)',
  },
  urgent: {
    '50': 'oklch(0.98 0.02 0)',
    '100': 'oklch(0.95 0.04 0)',
    '200': 'oklch(0.90 0.08 0)',
    '300': 'oklch(0.85 0.12 0)',
    '400': 'oklch(0.75 0.20 0)',
    '500': 'oklch(0.591 0.293 322.896)', // Urgent red
    '600': 'oklch(0.55 0.25 0)',
    '700': 'oklch(0.50 0.22 0)',
    '800': 'oklch(0.45 0.20 0)',
    '900': 'oklch(0.40 0.18 0)',
  },
  success: {
    '50': 'oklch(0.98 0.02 142.15)',
    '100': 'oklch(0.95 0.04 142.15)',
    '200': 'oklch(0.90 0.08 142.15)',
    '300': 'oklch(0.85 0.12 142.15)',
    '400': 'oklch(0.75 0.20 142.15)',
    '500': 'oklch(0.667 0.295 142.15)', // Success green
    '600': 'oklch(0.60 0.25 142.15)',
    '700': 'oklch(0.55 0.22 142.15)',
    '800': 'oklch(0.50 0.20 142.15)',
    '900': 'oklch(0.45 0.18 142.15)',
  },
  warning: {
    '50': 'oklch(0.98 0.02 48.15)',
    '100': 'oklch(0.95 0.04 48.15)',
    '200': 'oklch(0.90 0.08 48.15)',
    '300': 'oklch(0.85 0.12 48.15)',
    '400': 'oklch(0.75 0.20 48.15)',
    '500': 'oklch(0.667 0.295 48.15)', // Warning yellow
    '600': 'oklch(0.60 0.25 48.15)',
    '700': 'oklch(0.55 0.22 48.15)',
    '800': 'oklch(0.50 0.20 48.15)',
    '900': 'oklch(0.45 0.18 48.15)',
  },
  neutral: {
    '50': 'oklch(0.98 0.02 0)',
    '100': 'oklch(0.95 0.04 0)',
    '200': 'oklch(0.90 0.08 0)',
    '300': 'oklch(0.85 0.12 0)',
    '400': 'oklch(0.75 0.20 0)',
    '500': 'oklch(0.667 0.295 0)', // Neutral gray
    '600': 'oklch(0.60 0.25 0)',
    '700': 'oklch(0.55 0.22 0)',
    '800': 'oklch(0.50 0.20 0)',
    '900': 'oklch(0.45 0.18 0)',
  },
  semantic: {
    info: 'oklch(0.667 0.295 322.15)', // Medical blue
    success: 'oklch(0.667 0.295 142.15)', // Success green
    warning: 'oklch(0.667 0.295 48.15)', // Warning yellow
    error: 'oklch(0.591 0.293 322.896)', // Urgent red
    disabled: 'oklch(0.75 0.20 0)', // Neutral gray
    focus: 'oklch(0.667 0.295 322.15)', // Medical blue
    overlay: 'oklch(0.98 0.02 0)', // White
  },
} 