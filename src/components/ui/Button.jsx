import { cn } from '../../utils/cn'

const variants = {
  primary: 'bg-[var(--brand)] text-white hover:-translate-y-0.5 hover:shadow-lg',
  ghost: 'bg-white text-[var(--text)] border border-[var(--stroke)] hover:bg-slate-50',
}

export default function Button({
  children,
  className,
  variant = 'primary',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={cn(
        'rounded-2xl px-5 py-3 text-sm font-semibold transition duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
