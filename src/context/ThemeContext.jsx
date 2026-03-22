import { useEffect, useMemo, useState } from 'react'
import ThemeContext from './theme-context'
import { getStoredTheme, storeTheme } from '../utils/themeStorage'

function getSystemTheme() {
  if (typeof window === 'undefined') {
    return 'light'
  }

  return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light'
}

function applyThemeToDom(theme) {
  if (typeof document === 'undefined') {
    return
  }

  document.documentElement.classList.toggle('dark', theme === 'dark')
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => getStoredTheme() ?? getSystemTheme())

  useEffect(() => {
    applyThemeToDom(theme)
    storeTheme(theme)
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      setTheme,
      toggleTheme: () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')),
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
