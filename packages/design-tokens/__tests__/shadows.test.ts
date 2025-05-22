import { shadows } from '../shadows'

describe('Shadow Tokens', () => {
  it('should have all required shadow values', () => {
    const shadowTypes = ['none', 'sm', 'base', 'md', 'lg', 'xl', '2xl', 'inner']
    shadowTypes.forEach(type => {
      expect(shadows).toHaveProperty(type)
    })
  })

  it('should have valid shadow values', () => {
    Object.entries(shadows).forEach(([key, value]) => {
      expect(typeof value).toBe('string')
      if (key === 'none') {
        expect(value).toBe('none')
      } else {
        // Shadow values should be valid CSS box-shadow values
        expect(value).toMatch(/^[0-9a-z\s,()#.]+$/)
      }
    })
  })

  it('should have consistent shadow intensity', () => {
    const shadowValues = Object.entries(shadows)
      .filter(([key]) => key !== 'none' && key !== 'inner')
      .map(([_, value]) => value)

    // Check if shadow values increase in intensity
    for (let i = 1; i < shadowValues.length; i++) {
      const currentShadow = shadowValues[i]
      const previousShadow = shadowValues[i - 1]
      
      // Compare the number of shadow layers (more layers = more intense)
      const currentLayers = currentShadow.split(',').length
      const previousLayers = previousShadow.split(',').length
      expect(currentLayers).toBeGreaterThanOrEqual(previousLayers)
    }
  })
}) 