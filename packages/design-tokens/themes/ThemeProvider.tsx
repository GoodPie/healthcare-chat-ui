import * as React from 'react'
import { type ThemeName, themes, generateThemeCSS } from './index'

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: ThemeName
  storageKey?: string
}

interface ThemeProviderState {
  theme: ThemeName
  setTheme: (theme: ThemeName) => void
}

const initialState: ThemeProviderState = {
  theme: 'light',
  setTheme: () => null,
}

const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'healthcare-chat-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<ThemeName>(
    () => (localStorage.getItem(storageKey) as ThemeName) || defaultTheme
  )

  React.useEffect(() => {
    const root = window.document.documentElement
    root.setAttribute('data-theme', theme)
    localStorage.setItem(storageKey, theme)
  }, [theme, storageKey])

  const value = React.useMemo(
    () => ({
      theme,
      setTheme: (theme: ThemeName) => {
        setTheme(theme)
      },
    }),
    [theme]
  )

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}

// React Native specific implementation
export function ThemeProviderNative({
  children,
  defaultTheme = 'light',
  storageKey = 'healthcare-chat-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<ThemeName>(defaultTheme)

  React.useEffect(() => {
    // In React Native, you might want to use AsyncStorage instead
    // AsyncStorage.setItem(storageKey, theme)
  }, [theme, storageKey])

  const value = React.useMemo(
    () => ({
      theme,
      setTheme: (theme: ThemeName) => {
        setTheme(theme)
      },
    }),
    [theme]
  )

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

// Theme stylesheet for React Native
export function getThemeStyles(theme: ThemeName) {
  const currentTheme = themes[theme]
  return {
    background: { backgroundColor: currentTheme.colors.background },
    foreground: { color: currentTheme.colors.foreground },
    primary: { color: currentTheme.colors.primary },
    secondary: { backgroundColor: currentTheme.colors.secondary },
    accent: { backgroundColor: currentTheme.colors.accent },
    muted: { backgroundColor: currentTheme.colors.muted },
    mutedForeground: { color: currentTheme.colors.mutedForeground },
    border: { borderColor: currentTheme.colors.border },
    input: { borderColor: currentTheme.colors.input },
    ring: { borderColor: currentTheme.colors.ring },
  }
} 