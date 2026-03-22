import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import NotificationItem from '../components/NotificationItem'
import EmptyState from '../components/ui/EmptyState'
import LoadingSkeleton from '../components/ui/LoadingSkeleton'
import { notifications } from '../utils/mockData'

export default function NotificationsPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl text-[var(--text)] sm:text-4xl">Notifications</h1>
        <p className="mt-2 text-[var(--muted)]">
          Important updates so you do not miss deadlines.
        </p>
      </motion.header>

      {loading ? (
        <div className="space-y-3">
          <LoadingSkeleton className="h-24 w-full" />
          <LoadingSkeleton className="h-24 w-full" />
          <LoadingSkeleton className="h-24 w-full" />
        </div>
      ) : notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map((item) => (
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
