import { shadows, textShadows, dropShadows, shadowUtilities } from '../src/shadows'

describe('Shadow Tokens', () => {
  describe('Box Shadows', () => {
    it('should have all required shadow values', () => {
      const shadowTypes = ['none', 'sm', 'base', 'md', 'lg', 'xl', '2xl', 'inner']
      shadowTypes.forEach(type => {
        expect(shadows).toHaveProperty(type)
      })
    })

    it('should use CSS variables for shadow values', () => {
      Object.entries(shadows).forEach(([key, value]) => {
        expect(typeof value).toBe('string')
        if (key === 'none') {
          expect(value).toBe('var(--shadow-none)')
        } else {
          expect(value).toMatch(/^var\(--shadow-[a-z0-9-]+\)$/)
        }
      })
    })
  })

  describe('Text Shadows', () => {
    it('should have all required text shadow values', () => {
      const textShadowTypes = ['none', '2xs', 'xs', 'sm', 'md', 'lg']
      textShadowTypes.forEach(type => {
        expect(textShadows).toHaveProperty(type)
      })
    })

    it('should use CSS variables for text shadow values', () => {
      Object.entries(textShadows).forEach(([key, value]) => {
        expect(typeof value).toBe('string')
        if (key === 'none') {
          expect(value).toBe('none')
        } else {
          expect(value).toMatch(/^var\(--text-shadow-[a-z0-9-]+\)$/)
        }
      })
    })
  })

  describe('Drop Shadows', () => {
    it('should have all required drop shadow values', () => {
      const dropShadowTypes = ['none', 'sm', 'md', 'lg', 'xl', '2xl']
      dropShadowTypes.forEach(type => {
        expect(dropShadows).toHaveProperty(type)
      })
    })

    it('should use CSS variables for drop shadow values', () => {
      Object.entries(dropShadows).forEach(([key, value]) => {
        expect(typeof value).toBe('string')
        if (key === 'none') {
          expect(value).toBe('none')
        } else {
          expect(value).toMatch(/^var\(--drop-shadow-[a-z0-9-]+\)$/)
        }
      })
    })
  })

  describe('Shadow Utilities', () => {
    it('should have all required box shadow utilities', () => {
      const boxShadowTypes = ['none', 'sm', 'base', 'md', 'lg', 'xl', '2xl', 'inner']
      boxShadowTypes.forEach(type => {
        expect(shadowUtilities.box).toHaveProperty(type)
      })
    })

    it('should have all required text shadow utilities', () => {
      const textShadowTypes = ['none', '2xs', 'xs', 'sm', 'md', 'lg']
      textShadowTypes.forEach(type => {
        expect(shadowUtilities.text).toHaveProperty(type)
      })
    })

    it('should have all required drop shadow utilities', () => {
      const dropShadowTypes = ['none', 'sm', 'md', 'lg', 'xl', '2xl']
      dropShadowTypes.forEach(type => {
        expect(shadowUtilities.drop).toHaveProperty(type)
      })
    })

    it('should have all required colored shadow utilities', () => {
      const colorTypes = ['medical', 'urgent', 'success', 'warning', 'neutral']
      colorTypes.forEach(type => {
        expect(shadowUtilities.color).toHaveProperty(type)
      })
    })
  })
}) 