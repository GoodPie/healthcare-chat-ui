import { spacing } from '../spacing'

describe('Spacing Tokens', () => {
  const expectedKeys = [
    '0', 'px', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7', '8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36', '40', '44', '48', '52', '56', '60', '64', '72', '80', '96'
  ];

  it('should have all required spacing values', () => {
    expectedKeys.forEach(key => {
      expect(Object.prototype.hasOwnProperty.call(spacing, key)).toBe(true);
    });
  });

  it('should not have unexpected spacing keys', () => {
    const actualKeys = Object.keys(spacing).sort();
    const sortedExpected = [...expectedKeys].sort();
    expect(actualKeys).toEqual(sortedExpected);
  });

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
    // Get all numeric keys and sort them
    const numericKeys = expectedKeys.filter(key => key !== 'px').map(Number).sort((a, b) => a - b)
    // Convert values to pixels for comparison
    const values = numericKeys.map(key => {
      const value = spacing[key.toString()]
      const remValue = parseFloat(value)
      return remValue * 16 // Convert rem to pixels
    })
    // Check if values are in ascending order
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThan(values[i - 1])
    }
  })

  it('should have correct spacing values', () => {
    // Test specific values
    expect(spacing['0']).toBe('0rem')
    expect(spacing['px']).toBe('1px')
    expect(spacing['0.5']).toBe('0.125rem')
    expect(spacing['1']).toBe('0.25rem')
    expect(spacing['2']).toBe('0.5rem')
    expect(spacing['4']).toBe('1rem')
    expect(spacing['8']).toBe('2rem')
    expect(spacing['16']).toBe('4rem')
    expect(spacing['32']).toBe('8rem')
    expect(spacing['64']).toBe('16rem')
    expect(spacing['96']).toBe('24rem')
  })
}) 