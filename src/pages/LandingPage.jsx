import { ArrowRight, CircleHelp, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import ThemeToggle from '../components/ui/ThemeToggle'

export default function LandingPage() {
  return (
    <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16 sm:px-10">
      <div className="absolute right-6 top-6 sm:right-10 sm:top-8">
        <ThemeToggle />
      </div>
      <section className="grid gap-10 rounded-[2rem] border border-[var(--stroke)] bg-white/80 p-8 shadow-xl backdrop-blur-sm transition duration-300 lg:grid-cols-2 lg:p-14">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--brand-soft)] px-3 py-1 text-xs font-semibold text-[var(--brand)]">
            <Sparkles size={14} />
            Human-friendly campus guidance
          </div>

          <h1 className="text-4xl leading-tight text-[var(--text)] sm:text-5xl">
            CampusSync for calmer student life
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            Get instant, clear answers for exams, fees, schedules, and campus
            processes. Designed to feel like talking to a kind advisor, not a robot.
          </p>

          <div className="mt-6 grid max-w-xl grid-cols-3 gap-3">
            <div className="rounded-2xl border border-[var(--stroke)] bg-white p-3">
              <p className="text-xs text-slate-500">Avg response</p>
              <p className="mt-1 text-sm font-semibold text-[var(--text)]">Under 30 sec</p>
            </div>
            <div className="rounded-2xl border border-[var(--stroke)] bg-white p-3">
              <p className="text-xs text-slate-500">24/7 support</p>
              <p className="mt-1 text-sm font-semibold text-[var(--text)]">Always on</p>
            </div>
            <div className="rounded-2xl border border-[var(--stroke)] bg-white p-3">
              <p className="text-xs text-slate-500">Experience</p>
              <p className="mt-1 text-sm font-semibold text-[var(--text)]">Warm, clear</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/login">
              <Button className="inline-flex items-center gap-2">
                Enter CampusSync
                <ArrowRight size={16} />
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="ghost">Create Account</Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 rounded-3xl bg-gradient-to-br from-emerald-50 to-blue-50 p-6">
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-500">Student asks</p>
            <p className="mt-1 text-sm text-[var(--text)]">
              I have two exams on the same day. What should I do?
            </p>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-500">Assistant replies</p>
            <p className="mt-1 text-sm text-[var(--text)]">
              You can file a clash request in the exam portal before Friday. Want
              me to guide you with the exact form and timeline?
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-dashed border-emerald-200 bg-white/75 p-4 text-sm text-[var(--muted)]">
            <CircleHelp size={16} className="text-[var(--brand)]" />
            Always-available help that speaks your language.
          </div>
        </div>
      </section>
    </div>
  )
}
