import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Button from '../components/ui/Button'
import useAuth from '../hooks/useAuth'
import InputField from '../components/ui/InputField'
import ThemeToggle from '../components/ui/ThemeToggle'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const validate = () => {
    const nextErrors = {}

    if (!form.email.trim()) {
      nextErrors.email = 'Please add your college email.'
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = 'That email format looks incorrect.'
    }

    if (!form.password.trim()) {
      nextErrors.password = 'Password cannot be empty.'
    } else if (form.password.length < 6) {
      nextErrors.password = 'Password should be at least 6 characters.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setServerError('')

    if (!validate()) {
      return
    }

    try {
      setSubmitting(true)
      login(form)
      navigate('/app/dashboard')
    } catch (error) {
      setServerError(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative mx-auto flex min-h-screen max-w-md items-center px-5 py-10">
      <div className="absolute right-5 top-6">
        <ThemeToggle />
      </div>
      <div className="w-full rounded-3xl border border-[var(--stroke)] bg-white/85 p-7 shadow-xl backdrop-blur-sm">
        <h1 className="text-3xl text-[var(--text)]">Welcome back</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Login to continue your student support conversations.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <InputField
            id="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            placeholder="you@college.edu"
            error={errors.email}
          />

          <InputField
            id="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
            placeholder="Enter your password"
            error={errors.password}
          />

          <Button type="submit" className="w-full" loading={submitting}>
            Login
          </Button>

          {serverError && <p className="text-sm text-rose-500">{serverError}</p>}
        </form>

        <p className="mt-5 text-center text-sm text-[var(--muted)]">
          New here?{' '}
          <Link to="/signup" className="font-semibold text-[var(--brand)] hover:underline">
            Create your account
          </Link>
        </p>
      </div>
    </div>
  )
}
