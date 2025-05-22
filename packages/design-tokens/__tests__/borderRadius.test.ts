import { borderRadius } from '../borderRadius'

describe('Border Radius Tokens', () => {
  it('should have all required border radius values', () => {
    const radii = ['none', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl', 'full']
    radii.forEach(radius => {
      expect(borderRadius).toHaveProperty(radius)
    })
  })

  it('should have valid border radius values', () => {
    Object.entries(borderRadius).forEach(([key, value]) => {
      expect(typeof value).toBe('string')
      if (key === 'none') {
        expect(value).toBe('0')
      } else if (key === 'full') {
        expect(value).toBe('9999px')
      } else {
        expect(value).toMatch(/^[\d.]+(px|rem)$/)
      }
    })
  })

  it('should have consistent border radius scale', () => {
    const values = Object.entries(borderRadius)
      .filter(([key]) => key !== 'none' && key !== 'full')
      .map(([_, value]) => parseFloat(value))

    // Check if values are in ascending order
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThan(values[i - 1])
    }
  })
}) 