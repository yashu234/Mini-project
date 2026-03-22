import { Moon, Sun } from 'lucide-react'
import useTheme from '../../hooks/useTheme'
import { cn } from '../../utils/cn'

export default function ThemeToggle({ className, iconSize = 16, showLabel = false }) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'inline-flex items-center gap-2 rounded-2xl border border-[var(--stroke)] bg-[var(--surface)] px-3 py-2 text-sm font-medium text-[var(--text)] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md',
        className,
      )}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? <Sun size={iconSize} /> : <Moon size={iconSize} />}
      {showLabel && <span>{isDark ? 'Light' : 'Dark'}</span>}
    </button>
  )
}
