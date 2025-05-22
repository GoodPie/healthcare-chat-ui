import { transitions, startingStyles, transitionUtilities } from '../src/transitions'

describe('Transition Tokens', () => {
  describe('Duration', () => {
    it('should have all required duration values', () => {
      const durations = ['75', '100', '150', '200', '300', '500', '700', '1000']
      durations.forEach(duration => {
        expect(transitions.duration).toHaveProperty(duration)
      })
    })

    it('should use CSS variables for duration values', () => {
      Object.entries(transitions.duration).forEach(([key, value]) => {
        expect(typeof value).toBe('string')
        expect(value).toMatch(/^var\(--transition-duration-\d+\)$/)
      })
    })
  })

  describe('Timing Function', () => {
    it('should have all required timing function values', () => {
      const timingFunctions = ['linear', 'in', 'out', 'in-out', 'discrete']
      timingFunctions.forEach(timing => {
        expect(transitions.timingFunction).toHaveProperty(timing)
      })
    })

    it('should use CSS variables for timing functions', () => {
      Object.entries(transitions.timingFunction).forEach(([key, value]) => {
        expect(typeof value).toBe('string')
        expect(value).toMatch(/^var\(--transition-timing-(?:linear|in|out|in-out|discrete)\)$/)
      })
    })
  })

  describe('Default', () => {
    it('should use CSS variable for default transition', () => {
      expect(typeof transitions.default).toBe('string')
      expect(transitions.default).toBe('var(--transition-default)')
    })
  })

  describe('Starting Styles', () => {
    it('should have all required starting style variants', () => {
      const variants = ['opacity', 'scale', 'translate', 'rotate', 'blur']
      variants.forEach(variant => {
        expect(startingStyles).toHaveProperty(variant)
      })
    })

    it('should use correct starting style syntax', () => {
      Object.values(startingStyles).forEach(value => {
        expect(value).toMatch(/^starting:[a-z-]+-[0-9a-z]+$/)
      })
    })
  })

  describe('Transition Utilities', () => {
    it('should have all required base transition utilities', () => {
      const baseTransitions = ['all', 'colors', 'opacity', 'transform', 'shadow', 'filter', 'backdrop']
      baseTransitions.forEach(transition => {
        expect(transitionUtilities).toHaveProperty(transition)
      })
    })

    it('should have duration utilities', () => {
      const durations = ['75', '100', '150', '200', '300', '500', '700', '1000']
      durations.forEach(duration => {
        expect(transitionUtilities.duration).toHaveProperty(duration)
      })
    })

    it('should have timing function utilities', () => {
      const timings = ['linear', 'in', 'out', 'in-out', 'discrete']
      timings.forEach(timing => {
        expect(transitionUtilities.timing).toHaveProperty(timing)
      })
    })

    it('should have delay utilities', () => {
      const delays = ['75', '100', '150', '200', '300', '500', '700', '1000']
      delays.forEach(delay => {
        expect(transitionUtilities.delay).toHaveProperty(delay)
      })
    })
  })
}) 