import { breakpoints } from '../breakpoints'

describe('Breakpoint Tokens', () => {
  it('should have all required breakpoint values', () => {
    const screens = ['sm', 'md', 'lg', 'xl', '2xl']
    screens.forEach(screen => {
      expect(breakpoints).toHaveProperty(screen)
    })
  })

  it('should have valid breakpoint values', () => {
    Object.entries(breakpoints).forEach(([key, value]) => {
      expect(typeof value).toBe('string')
      expect(value).toMatch(/^[\d.]+px$/)
    })
  })

  it('should have consistent breakpoint scale', () => {
    const values = Object.entries(breakpoints)
      .map(([_, value]) => parseInt(value))

    // Check if values are in ascending order
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThan(values[i - 1])
    }
  })

  it('should have reasonable breakpoint ranges', () => {
    const values = Object.entries(breakpoints)
      .map(([_, value]) => parseInt(value))

    // Check if breakpoints are within reasonable ranges
    expect(values[0]).toBeGreaterThanOrEqual(640) // sm should be at least 640px
    expect(values[values.length - 1]).toBeLessThanOrEqual(1536) // 2xl should be at most 1536px
  })
}) 