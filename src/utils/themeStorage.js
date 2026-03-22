const THEME_KEY = 'campussync_theme'

export function getStoredTheme() {
  try {
    const value = localStorage.getItem(THEME_KEY)
    if (value === 'light' || value === 'dark') {
      return value
    }
  } catch {
    // ignore
  }

  return null
}

export function storeTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {
    // ignore
  }
}
