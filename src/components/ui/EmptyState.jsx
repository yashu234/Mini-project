import { Sparkles } from 'lucide-react'

export default function EmptyState({
  title = 'Nothing here yet',
  message = 'Once new items arrive, this space will update automatically.',
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-[var(--stroke)] bg-[var(--surface)]/60 px-6 py-10 text-center">
      <div className="mb-3 rounded-full bg-[var(--brand-soft)] p-3 text-[var(--brand)]">
        <Sparkles size={20} />
      </div>
      <p className="font-medium text-[var(--text)]">{title}</p>
      <p className="mt-2 max-w-sm text-sm text-[var(--muted)]">{message}</p>
    </div>
  )
}
