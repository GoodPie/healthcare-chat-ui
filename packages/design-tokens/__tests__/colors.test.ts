import { getColor, getSemanticColor, colorScales, semanticColors, type ColorScale, type ColorShade, type SemanticColor } from '../src/colors'

describe('Color Tokens', () => {
  describe('Color Scales', () => {
    it('should have all required color scales', () => {
      const scales: ColorScale[] = ['medical', 'urgent', 'success', 'warning', 'neutral']
      scales.forEach(scale => {
        expect(colorScales).toHaveProperty(scale)
      })
    })

    it('should have all required shades for each scale', () => {
      const scales: ColorScale[] = ['medical', 'urgent', 'success', 'warning', 'neutral']
      const shades: ColorShade[] = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900']

      scales.forEach(scale => {
        shades.forEach(shade => {
          expect(colorScales[scale]).toHaveProperty(shade)
        })
      })
    })

    it('should have valid CSS variable references', () => {
      const scales: ColorScale[] = ['medical', 'urgent', 'success', 'warning', 'neutral']
      const shades: ColorShade[] = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900']

      scales.forEach(scale => {
        shades.forEach(shade => {
          const color = getColor(scale, shade)
          expect(color).toMatch(/^var\(--color-[a-z]+-\d+\)$/)
        })
      })
    })
  })

  describe('Semantic Colors', () => {
    it('should have all required semantic colors', () => {
      const semanticColorList: SemanticColor[] = ['info', 'success', 'warning', 'error', 'disabled', 'focus', 'overlay']
      semanticColorList.forEach(color => {
        expect(semanticColors).toHaveProperty(color)
      })
    })

    it('should have valid CSS variable references for semantic colors', () => {
      const semanticColorList: SemanticColor[] = ['info', 'success', 'warning', 'error', 'disabled', 'focus', 'overlay']
      semanticColorList.forEach(color => {
        const colorValue = getSemanticColor(color)
        expect(colorValue).toMatch(/^var\(--color-semantic-[a-z]+\)$/)
      })
    })
  })

  describe('Utility Functions', () => {
    it('getColor should return correct CSS variable reference', () => {
      expect(getColor('medical', '500')).toBe('var(--color-medical-500)')
      expect(getColor('urgent', '500')).toBe('var(--color-urgent-500)')
    })

    it('getSemanticColor should return correct CSS variable reference', () => {
      expect(getSemanticColor('info')).toBe('var(--color-semantic-info)')
      expect(getSemanticColor('success')).toBe('var(--color-semantic-success)')
    })

    it('should throw error for invalid color scale', () => {
      expect(() => getColor('invalid' as ColorScale, '500')).toThrow('Invalid color scale: invalid')
    })

    it('should throw error for invalid semantic color', () => {
      expect(() => getSemanticColor('invalid' as SemanticColor)).toThrow('Invalid semantic color: invalid')
    })
  })
}) 