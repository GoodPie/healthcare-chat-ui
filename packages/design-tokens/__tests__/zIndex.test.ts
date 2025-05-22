import { zIndex } from '../src/zIndex'

describe('Z-Index Tokens', () => {
  it('should have all required z-index values', () => {
    const indices = ['0', '10', '20', '30', '40', '50', 'auto']
    indices.forEach(index => {
      expect(zIndex).toHaveProperty(index)
    })
  })

  it('should have valid z-index values', () => {
    Object.entries(zIndex).forEach(([key, value]) => {
      expect(typeof value).toBe('string')
      if (key === 'auto') {
        expect(value).toBe('auto')
      } else {
        expect(value).toBe(key)
      }
    })
  })

  it('should have consistent z-index scale', () => {
    const values = Object.entries(zIndex)
      .filter(([key]) => key !== 'auto')
      .map(([key]) => parseInt(key))

    // Check if values are in ascending order
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThan(values[i - 1])
    }
  })
}) 