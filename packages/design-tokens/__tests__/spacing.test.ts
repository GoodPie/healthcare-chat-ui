import { spacing } from '../spacing'

describe('Spacing Tokens', () => {
  it('should have all required spacing values', () => {
    const spaces = ['0', 'px', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7', '8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36', '40', '44', '48', '52', '56', '60', '64', '72', '80', '96']
    spaces.forEach(space => {
      expect(spacing).toHaveProperty(space)
    })
  })

  it('should have valid spacing values', () => {
    Object.entries(spacing).forEach(([key, value]) => {
      expect(typeof value).toBe('string')
      if (key === 'px') {
        expect(value).toBe('1px')
      } else {
        expect(value).toMatch(/^[\d.]+rem$/)
      }
    })
  })

  it('should have consistent spacing scale', () => {
    const values = Object.entries(spacing)
      .filter(([key]) => key !== 'px')
      .map(([_, value]) => parseFloat(value))

    // Check if values are in ascending order
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThan(values[i - 1])
    }
  })
}) 