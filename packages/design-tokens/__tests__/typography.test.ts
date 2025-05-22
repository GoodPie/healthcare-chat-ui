import { typography, getFontSize, getFontWeight, getLineHeight, getLetterSpacing, type FontFamily, type FontSizeKey, type FontWeightKey, type LineHeightKey, type LetterSpacingKey } from '../src/typography'

describe('Typography Tokens', () => {
  describe('Font Families', () => {
    it('should have all required font families', () => {
      const families: FontFamily[] = ['sans', 'serif', 'mono']
      families.forEach(family => {
        expect(typography.fontFamily).toHaveProperty(family)
        expect(typography.fontFamily[family]).toMatch(/^var\(--font-(sans|serif|mono)\)$/)
      })
    })
  })

  describe('Font Sizes', () => {
    it('should have all required font sizes as CSS variables', () => {
      const sizes: FontSizeKey[] = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl']
      sizes.forEach(size => {
        expect(typography.fontSize).toHaveProperty(size)
        expect(typography.fontSize[size]).toMatch(/^var\(--font-size-[a-z0-9]+\)$/)
      })
    })
    it('getFontSize should return the correct CSS variable', () => {
      expect(getFontSize('lg')).toBe('var(--font-size-lg)')
      expect(getFontSize('2xl')).toBe('var(--font-size-2xl)')
    })
  })

  describe('Font Weights', () => {
    it('should have all required font weights as CSS variables', () => {
      const weights: FontWeightKey[] = ['regular', 'medium', 'semibold', 'bold']
      weights.forEach(weight => {
        expect(typography.fontWeight).toHaveProperty(weight)
        expect(typography.fontWeight[weight]).toMatch(/^var\(--font-weight-(regular|medium|semibold|bold)\)$/)
      })
    })
    it('getFontWeight should return the correct CSS variable', () => {
      expect(getFontWeight('bold')).toBe('var(--font-weight-bold)')
      expect(getFontWeight('regular')).toBe('var(--font-weight-regular)')
    })
  })

  describe('Line Heights', () => {
    it('should have all required line heights as CSS variables', () => {
      const heights: LineHeightKey[] = ['none', 'tight', 'normal', 'relaxed', 'loose']
      heights.forEach(height => {
        expect(typography.lineHeight).toHaveProperty(height)
        expect(typography.lineHeight[height]).toMatch(/^var\(--line-height-(none|tight|normal|relaxed|loose)\)$/)
      })
    })
    it('getLineHeight should return the correct CSS variable', () => {
      expect(getLineHeight('relaxed')).toBe('var(--line-height-relaxed)')
      expect(getLineHeight('normal')).toBe('var(--line-height-normal)')
    })
  })

  describe('Letter Spacing', () => {
    it('should have all required letter spacing as CSS variables', () => {
      const spacings: LetterSpacingKey[] = ['tight', 'normal', 'wide']
      spacings.forEach(spacing => {
        expect(typography.letterSpacing).toHaveProperty(spacing)
        expect(typography.letterSpacing[spacing]).toMatch(/^var\(--tracking-(tight|normal|wide)\)$/)
      })
    })
    it('getLetterSpacing should return the correct CSS variable', () => {
      expect(getLetterSpacing('wide')).toBe('var(--tracking-wide)')
      expect(getLetterSpacing('tight')).toBe('var(--tracking-tight)')
    })
  })
}) 