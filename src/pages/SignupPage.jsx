import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Button from '../components/ui/Button'
import useAuth from '../hooks/useAuth'
import InputField from '../components/ui/InputField'

export default function SignupPage() {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')

  const validate = () => {
    const nextErrors = {}

    if (!form.name.trim()) {
      nextErrors.name = 'Tell us what to call you.'
    }

    if (!form.email.trim()) {
      nextErrors.email = 'Please add your email.'
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = 'That email format looks incorrect.'
    }

    if (!form.password.trim()) {
      nextErrors.password = 'Please choose a password.'
    } else if (form.password.length < 6) {
      nextErrors.password = 'Use at least 6 characters for better security.'
    }

    if (!form.confirmPassword.trim()) {
      nextErrors.confirmPassword = 'Please confirm your password.'
    } else if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = 'Passwords do not match.'
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
      signup(form)
      navigate('/app/dashboard')
    } catch (error) {
      setServerError(error.message)
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md items-center px-5 py-10">
      <div className="w-full rounded-3xl border border-[var(--stroke)] bg-white/80 p-7 shadow-xl backdrop-blur-sm">
        <h1 className="text-3xl text-[var(--text)]">Create account</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Start your support journey in under a minute.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <InputField
            id="name"
            label="Name"
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            placeholder="Naitik Sharma"
            error={errors.name}
          />

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
            placeholder="Choose a strong password"
            error={errors.password}
          />

          <InputField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            value={form.confirmPassword}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, confirmPassword: event.target.value }))
            }
            placeholder="Re-enter your password"
            error={errors.confirmPassword}
          />

          <Button type="submit" className="w-full">
            Sign Up
          </Button>

          {serverError && <p className="text-sm text-rose-500">{serverError}</p>}
        </form>

        <p className="mt-5 text-center text-sm text-[var(--muted)]">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-[var(--brand)] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
