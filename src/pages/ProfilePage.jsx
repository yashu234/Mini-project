import Card from '../components/ui/Card'

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <header>
        <h1 className="text-3xl text-[var(--text)] sm:text-4xl">Profile</h1>
        <p className="mt-2 text-[var(--muted)]">
          Keep your student details up to date for better personalized help.
        </p>
      </header>

      <Card title="Student information" subtitle="This is a preview of your profile details">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-4">
            <dt className="text-xs text-slate-500">Name</dt>
            <dd className="mt-1 font-medium text-[var(--text)]">Naitik Sharma</dd>
          </div>
          <div className="rounded-2xl bg-white p-4">
            <dt className="text-xs text-slate-500">Department</dt>
            <dd className="mt-1 font-medium text-[var(--text)]">Computer Science</dd>
          </div>
          <div className="rounded-2xl bg-white p-4">
            <dt className="text-xs text-slate-500">Semester</dt>
            <dd className="mt-1 font-medium text-[var(--text)]">Semester 5</dd>
          </div>
          <div className="rounded-2xl bg-white p-4">
            <dt className="text-xs text-slate-500">Email</dt>
            <dd className="mt-1 font-medium text-[var(--text)]">naitik@college.edu</dd>
          </div>
        </dl>
      </Card>
    </div>
  )
}
