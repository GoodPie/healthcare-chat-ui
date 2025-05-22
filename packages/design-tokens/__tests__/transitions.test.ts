import { transitions } from '../transitions'

describe('Transition Tokens', () => {
  describe('Duration', () => {
    it('should have all required duration values', () => {
      const durations = ['75', '100', '150', '200', '300', '500', '700', '1000']
      durations.forEach(duration => {
        expect(transitions.duration).toHaveProperty(duration)
      })
    })

    it('should have valid duration values', () => {
      Object.entries(transitions.duration).forEach(([key, value]) => {
        expect(typeof value).toBe('string')
        expect(value).toMatch(/^[\d.]+ms$/)
        expect(parseInt(value)).toBe(parseInt(key))
      })
    })
  })

  describe('Timing Function', () => {
    it('should have all required timing function values', () => {
      const timingFunctions = ['linear', 'in', 'out', 'in-out']
      timingFunctions.forEach(timing => {
        expect(transitions.timingFunction).toHaveProperty(timing)
      })
    })

    it('should have valid timing function values', () => {
      Object.entries(transitions.timingFunction).forEach(([key, value]) => {
        expect(typeof value).toBe('string')
        expect(value).toMatch(/^cubic-bezier\([0-1],\s*[0-1],\s*[0-1],\s*[0-1]\)$|^linear$/)
      })
    })
  })

  describe('Default', () => {
    it('should have a valid default transition', () => {
      expect(typeof transitions.default).toBe('string')
      expect(transitions.default).toMatch(/^all\s+\d+ms\s+(?:cubic-bezier\([0-1],\s*[0-1],\s*[0-1],\s*[0-1]\)|linear)$/)
    })
  })
}) 