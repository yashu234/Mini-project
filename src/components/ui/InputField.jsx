import { cn } from '../../utils/cn'

export default function InputField({
  label,
  error,
  id,
  className,
  inputClassName,
  ...props
}) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="mb-2 block text-sm font-medium text-[var(--text)]">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          'w-full rounded-2xl border border-[var(--stroke)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)] outline-none transition placeholder:text-slate-400 focus:border-[var(--brand)] focus:ring-4 focus:ring-emerald-100',
          error && 'border-rose-300 bg-rose-50 focus:border-rose-400 focus:ring-rose-100',
          inputClassName,
        )}
        {...props}
      />
      {error && <p className="mt-2 text-xs text-rose-500">{error}</p>}
    </div>
  )
}
