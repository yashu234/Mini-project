import { BellRing } from 'lucide-react'

export default function NotificationItem({ title, message, timestamp }) {
  return (
    <article className="group flex items-start gap-3 rounded-2xl border border-[var(--stroke)] bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="rounded-xl bg-[var(--brand-soft)] p-2 text-[var(--brand)]">
        <BellRing size={16} />
      </div>
      <div>
        <h4 className="font-semibold text-[var(--text)]">{title}</h4>
        <p className="mt-1 text-sm text-[var(--muted)]">{message}</p>
        <p className="mt-2 text-xs text-slate-500">{timestamp}</p>
      </div>
    </article>
  )
}
