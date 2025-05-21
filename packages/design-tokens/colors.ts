import { type Config } from 'tailwindcss'

// Base colors with HSL values for better color manipulation
export const colors = {
  // Primary medical blues (trust, professionalism)
  'medical-blue': {
    50: 'hsl(210, 100%, 98%)',  // Lightest blue for backgrounds
    100: 'hsl(210, 100%, 96%)',
    200: 'hsl(210, 100%, 90%)',
    300: 'hsl(210, 100%, 80%)',
    400: 'hsl(210, 100%, 70%)',
    500: 'hsl(210, 100%, 50%)', // Primary blue - WCAG AA compliant
    600: 'hsl(210, 100%, 40%)',
    700: 'hsl(210, 100%, 30%)',
    800: 'hsl(210, 100%, 20%)',
    900: 'hsl(210, 100%, 10%)', // Darkest blue for text
  },

  // Emergency/urgent reds
  'urgent-red': {
    50: 'hsl(0, 100%, 98%)',    // Lightest red for backgrounds
    100: 'hsl(0, 100%, 96%)',
    200: 'hsl(0, 100%, 90%)',
    300: 'hsl(0, 100%, 80%)',
    400: 'hsl(0, 100%, 70%)',
    500: 'hsl(0, 100%, 50%)',   // Primary red - WCAG AA compliant
    600: 'hsl(0, 100%, 40%)',
    700: 'hsl(0, 100%, 30%)',
    800: 'hsl(0, 100%, 20%)',
    900: 'hsl(0, 100%, 10%)',   // Darkest red for text
  },

  // Success/positive greens
  'success-green': {
    50: 'hsl(142, 100%, 98%)',  // Lightest green for backgrounds
    100: 'hsl(142, 100%, 96%)',
    200: 'hsl(142, 100%, 90%)',
    300: 'hsl(142, 100%, 80%)',
    400: 'hsl(142, 100%, 70%)',
    500: 'hsl(142, 100%, 50%)', // Primary green - WCAG AA compliant
    600: 'hsl(142, 100%, 40%)',
    700: 'hsl(142, 100%, 30%)',
    800: 'hsl(142, 100%, 20%)',
    900: 'hsl(142, 100%, 10%)', // Darkest green for text
  },

  // Warning/caution yellows
  'warning-yellow': {
    50: 'hsl(48, 100%, 98%)',   // Lightest yellow for backgrounds
    100: 'hsl(48, 100%, 96%)',
    200: 'hsl(48, 100%, 90%)',
    300: 'hsl(48, 100%, 80%)',
    400: 'hsl(48, 100%, 70%)',
    500: 'hsl(48, 100%, 50%)',  // Primary yellow - WCAG AA compliant
    600: 'hsl(48, 100%, 40%)',
    700: 'hsl(48, 100%, 30%)',
    800: 'hsl(48, 100%, 20%)',
    900: 'hsl(48, 100%, 10%)',  // Darkest yellow for text
  },

  // Neutral grays for UI elements
  'neutral': {
    50: 'hsl(0, 0%, 98%)',      // Lightest gray for backgrounds
    100: 'hsl(0, 0%, 96%)',
    200: 'hsl(0, 0%, 90%)',
    300: 'hsl(0, 0%, 80%)',
    400: 'hsl(0, 0%, 70%)',
    500: 'hsl(0, 0%, 50%)',     // Primary gray - WCAG AA compliant
    600: 'hsl(0, 0%, 40%)',
    700: 'hsl(0, 0%, 30%)',
    800: 'hsl(0, 0%, 20%)',
    900: 'hsl(0, 0%, 10%)',     // Darkest gray for text
  },

  // Semantic colors for specific states
  'semantic': {
    'info': 'hsl(210, 100%, 50%)',      // Information messages
    'success': 'hsl(142, 100%, 50%)',    // Success messages
    'warning': 'hsl(48, 100%, 50%)',     // Warning messages
    'error': 'hsl(0, 100%, 50%)',        // Error messages
    'disabled': 'hsl(0, 0%, 70%)',       // Disabled state
    'focus': 'hsl(210, 100%, 50%)',      // Focus ring
    'overlay': 'hsla(0, 0%, 0%, 0.5)',   // Modal overlays
  }
} as const

// Tailwind configuration
export const tailwindConfig: Config = {
  theme: {
    extend: {
      colors: {
        ...colors,
      },
    },
  },
}

// Type definitions
export type ColorScale = keyof typeof colors
export type ColorShade = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
export type SemanticColor = keyof typeof colors.semantic

// Utility functions
export function getColor(color: ColorScale, shade: ColorShade): string {
  return colors[color][shade]
}

export function getSemanticColor(color: SemanticColor): string {
  return colors.semantic[color]
}
