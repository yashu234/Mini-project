import { useEffect, useState } from 'react'
import Card from '../components/ui/Card'
import useAuth from '../hooks/useAuth'
import LoadingSkeleton from '../components/ui/LoadingSkeleton'
import {
  dashboardStats,
  quickActions,
  recentQueries,
  suggestedQuestions,
} from '../utils/mockData'

export default function DashboardPage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="transition duration-300">
        <h1 className="text-3xl text-[var(--text)] sm:text-4xl">
          Good evening, {user?.name?.split(' ')[0] || 'Student'}
        </h1>
        <p className="mt-2 text-[var(--muted)]">
          Here is a quick snapshot so you can continue where you left off.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {dashboardStats.map((stat) => (
          <Card key={stat.id} className="rounded-2xl p-5">
            <p className="text-xs text-slate-500">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold text-[var(--text)]">{stat.value}</p>
            <p className="mt-1 text-xs text-[var(--muted)]">{stat.hint}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card
          title="Recent Queries"
          subtitle="Your latest conversations with student support"
        >
          {loading ? (
            <div className="space-y-3">
              <LoadingSkeleton className="h-16 w-full" />
              <LoadingSkeleton className="h-16 w-full" />
              <LoadingSkeleton className="h-16 w-full" />
            </div>
          ) : (
            <div className="space-y-3">
              {recentQueries.map((query) => (
                <article key={query.id} className="rounded-2xl bg-[var(--surface)] p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                    {query.topic}
                  </p>
                  <p className="mt-2 text-sm text-[var(--text)]">{query.question}</p>
                  <p className="mt-2 text-xs text-slate-500">{query.time}</p>
                </article>
              ))}
            </div>
          )}
        </Card>

        <Card
          title="Suggested Questions"
          subtitle="Tap any prompt to ask faster"
        >
          <div className="space-y-3">
            {suggestedQuestions.map((question) => (
              <button
                type="button"
                key={question}
                className="w-full rounded-2xl border border-[var(--stroke)] bg-[var(--surface)] px-4 py-3 text-left text-sm text-[var(--text)] transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50/40"
              >
                {question}
              </button>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Quick Actions" subtitle="Useful campus workflows you can open in one click">
        <div className="grid gap-3 md:grid-cols-3">
          {quickActions.map((item) => (
            <button
              key={item.id}
              type="button"
              className="rounded-2xl border border-[var(--stroke)] bg-[var(--surface)] p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-sm font-semibold text-[var(--text)]">{item.title}</p>
              <p className="mt-1 text-xs text-[var(--muted)]">{item.caption}</p>
            </button>
          ))}
        </div>
      </Card>
    </div>
  )
}
