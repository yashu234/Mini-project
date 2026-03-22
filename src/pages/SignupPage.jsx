import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Button from '../components/ui/Button'
import InputField from '../components/ui/InputField'

export default function SignupPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})

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

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validate()) {
      return
    }

    navigate('/app/dashboard')
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

          <Button type="submit" className="w-full">
            Sign Up
          </Button>
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
