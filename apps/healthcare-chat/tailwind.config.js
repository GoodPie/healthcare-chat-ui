import { colors } from '@healthcare-chat/design-tokens/src/colors/colors.js'
import { typography } from '@healthcare-chat/design-tokens/typography'
import { spacing } from '@healthcare-chat/design-tokens/spacing'
import { borderRadius } from '@healthcare-chat/design-tokens/borderRadius'
import { shadows } from '@healthcare-chat/design-tokens/shadows'
import { transitions } from '@healthcare-chat/design-tokens/transitions'
import { zIndex } from '@healthcare-chat/design-tokens/zIndex'
import { breakpoints } from '@healthcare-chat/design-tokens/breakpoints'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: colors,
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
      fontWeight: typography.fontWeight,
      lineHeight: typography.lineHeight,
      letterSpacing: typography.letterSpacing,
      spacing: spacing,
      borderRadius: borderRadius,
      boxShadow: shadows,
      transitionDuration: transitions.duration,
      transitionTimingFunction: transitions.timing,
      zIndex: zIndex,
      screens: breakpoints,
    },
  },
  plugins: [],
} 
