import { breakpoints, getBreakpoint, mediaQueries, type BreakpointKey } from '../breakpoints'

describe('Breakpoint Tokens', () => {
  it('should have all required breakpoint values', () => {
    const screens = ['sm', 'md', 'lg', 'xl', '2xl']
    screens.forEach(screen => {
      expect(breakpoints).toHaveProperty(screen)
    })
  })

  it('should have valid breakpoint values as CSS variables', () => {
    Object.entries(breakpoints).forEach(([key, value]) => {
      expect(typeof value).toBe('string')
      expect(value).toMatch(/^var\(--breakpoint-[a-z0-9]+\)$/)
    })
  })
})

describe('getBreakpoint function', () => {
  it('should return the correct CSS variable for each breakpoint', () => {
    expect(getBreakpoint('sm')).toBe('var(--breakpoint-sm)')
    expect(getBreakpoint('md')).toBe('var(--breakpoint-md)')
    expect(getBreakpoint('lg')).toBe('var(--breakpoint-lg)')
    expect(getBreakpoint('xl')).toBe('var(--breakpoint-xl)')
    expect(getBreakpoint('2xl')).toBe('var(--breakpoint-2xl)')
  })

  it('should throw an error for invalid breakpoint keys', () => {
    // @ts-expect-error Testing invalid input
    expect(() => getBreakpoint('invalid')).toThrow('Invalid breakpoint key')
  })
})

describe('mediaQueries object', () => {
  it('should have correct media query syntax for each breakpoint', () => {
    expect(mediaQueries.sm).toBe('@media (min-width: var(--breakpoint-sm))')
    expect(mediaQueries.md).toBe('@media (min-width: var(--breakpoint-md))')
    expect(mediaQueries.lg).toBe('@media (min-width: var(--breakpoint-lg))')
    expect(mediaQueries.xl).toBe('@media (min-width: var(--breakpoint-xl))')
    expect(mediaQueries['2xl']).toBe('@media (min-width: var(--breakpoint-2xl))')
  })

  it('should have all required breakpoint keys', () => {
    const expectedKeys: BreakpointKey[] = ['sm', 'md', 'lg', 'xl', '2xl']
    expect(Object.keys(mediaQueries)).toEqual(expectedKeys)
  })
})

describe('type exports', () => {
  it('should export BreakpointKey type', () => {
    const validKeys: BreakpointKey[] = ['sm', 'md', 'lg', 'xl', '2xl']
    const invalidKeys = ['xs', '3xl', 'invalid']

    validKeys.forEach(key => {
      expect(key).toBeDefined()
    })

    // TypeScript should error here because these keys are not valid BreakpointKey types
    invalidKeys.forEach(key => {
      // @ts-expect-error Testing invalid type
      const _: BreakpointKey = key
    })
  })
}) 