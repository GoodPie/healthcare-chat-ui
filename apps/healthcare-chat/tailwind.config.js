import { colors } from '@healthcare-chat-ui/design-tokens/colors'
import { typography } from '@healthcare-chat-ui/design-tokens/typography'
import { spacing } from '@healthcare-chat-ui/design-tokens/spacing'
import { borderRadius } from '@healthcare-chat-ui/design-tokens/borderRadius'
import { shadows } from '@healthcare-chat-ui/design-tokens/shadows'
import { transitions } from '@healthcare-chat-ui/design-tokens/transitions'
import { zIndex } from '@healthcare-chat-ui/design-tokens/zIndex'
import { breakpoints } from '@healthcare-chat-ui/design-tokens/breakpoints'

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