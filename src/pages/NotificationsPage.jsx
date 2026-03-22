import { useEffect, useState } from 'react'
import NotificationItem from '../components/NotificationItem'
import EmptyState from '../components/ui/EmptyState'
import LoadingSkeleton from '../components/ui/LoadingSkeleton'
import { notifications } from '../utils/mockData'

export default function NotificationsPage() {
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timeout)
  }, [])

  const visibleNotifications =
    activeFilter === 'all' ? notifications : notifications.slice(0, 1)

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <header className="transition duration-300">
        <h1 className="text-3xl text-[var(--text)] sm:text-4xl">Notifications</h1>
        <p className="mt-2 text-[var(--muted)]">
          Important updates so you do not miss deadlines.
        </p>

        <div className="mt-4 inline-flex rounded-xl border border-[var(--stroke)] bg-white p-1">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              activeFilter === 'all'
                ? 'bg-[var(--brand-soft)] text-[var(--brand)]'
                : 'text-[var(--muted)] hover:bg-slate-50'
            }`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('unread')}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              activeFilter === 'unread'
                ? 'bg-[var(--brand-soft)] text-[var(--brand)]'
                : 'text-[var(--muted)] hover:bg-slate-50'
            }`}
          >
            Unread
          </button>
        </div>
      </header>

      {loading ? (
        <div className="space-y-3">
          <LoadingSkeleton className="h-24 w-full" />
          <LoadingSkeleton className="h-24 w-full" />
          <LoadingSkeleton className="h-24 w-full" />
        </div>
      ) : visibleNotifications.length > 0 ? (
        <div className="space-y-3">
          {visibleNotifications.map((item) => (
            <NotificationItem key={item.id} {...item} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No updates right now"
          message="You are all caught up. We will notify you when something important arrives."
        />
      )}
    </div>
  )
}
