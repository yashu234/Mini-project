import { cn } from '../../utils/cn'

const variants = {
  primary: 'bg-[var(--brand)] text-white hover:-translate-y-0.5 hover:shadow-lg',
  ghost:
    'bg-[var(--surface)] text-[var(--text)] border border-[var(--stroke)] hover:bg-slate-50/60',
}

export default function Button({
  children,
  className,
  disabled,
  loading = false,
  variant = 'primary',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        className,
      )}
      {...props}
    >
      {loading && (
        <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      )}
      {children}
    </button>
  )
}
