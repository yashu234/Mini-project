import { cn } from '../../utils/cn'

export default function Card({ title, subtitle, children, className }) {
  return (
    <section
      className={cn(
        'rounded-3xl border border-[var(--stroke)] bg-[var(--panel)] p-6 shadow-sm backdrop-blur-sm',
        className,
      )}
    >
      {(title || subtitle) && (
        <header className="mb-4">
          {title && <h3 className="text-lg text-[var(--text)]">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-[var(--muted)]">{subtitle}</p>}
        </header>
      )}
      {children}
    </section>
  )
}
