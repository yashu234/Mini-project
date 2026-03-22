import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import InputField from '../components/ui/InputField'
import useAuth from '../hooks/useAuth'
import { useEffect, useState } from 'react'

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [errors, setErrors] = useState({})
  const [serverMessage, setServerMessage] = useState('')
  const [form, setForm] = useState({
    name: user?.name || '',
    department: user?.department || 'Computer Science',
    semester: user?.semester || 'Semester 4',
  })

  useEffect(() => {
    setForm({
      name: user?.name || '',
      department: user?.department || 'Computer Science',
      semester: user?.semester || 'Semester 4',
    })
  }, [user])

  const validate = () => {
    const nextErrors = {}

    if (!form.name.trim()) {
      nextErrors.name = 'Name cannot be empty.'
    }

    if (!form.department.trim()) {
      nextErrors.department = 'Department is required.'
    }

    if (!form.semester.trim()) {
      nextErrors.semester = 'Semester is required.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSave = (event) => {
    event.preventDefault()
    setServerMessage('')

    if (!validate()) {
      return
    }

    try {
      updateProfile(form)
      setIsEditing(false)
      setServerMessage('Profile updated successfully.')
    } catch (error) {
      setServerMessage(error.message)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setErrors({})
    setServerMessage('')
    setForm({
      name: user?.name || '',
      department: user?.department || 'Computer Science',
      semester: user?.semester || 'Semester 4',
    })
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <header>
        <h1 className="text-3xl text-[var(--text)] sm:text-4xl">Profile</h1>
        <p className="mt-2 text-[var(--muted)]">
          Keep your student details up to date for better personalized help.
        </p>
      </header>

      <Card title="Student information" subtitle="This is a preview of your profile details">
        {!isEditing ? (
          <>
            <dl className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-4">
                <dt className="text-xs text-slate-500">Name</dt>
                <dd className="mt-1 font-medium text-[var(--text)]">{user?.name || 'Student'}</dd>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <dt className="text-xs text-slate-500">Department</dt>
                <dd className="mt-1 font-medium text-[var(--text)]">{user?.department || 'Computer Science'}</dd>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <dt className="text-xs text-slate-500">Semester</dt>
                <dd className="mt-1 font-medium text-[var(--text)]">{user?.semester || 'Semester 4'}</dd>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <dt className="text-xs text-slate-500">Email</dt>
                <dd className="mt-1 font-medium text-[var(--text)]">{user?.email || '-'}</dd>
              </div>
            </dl>

            <div className="mt-5 flex justify-end">
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            </div>

            {serverMessage && <p className="mt-3 text-sm text-emerald-600">{serverMessage}</p>}
          </>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <InputField
              id="profile-name"
              label="Name"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              placeholder="Enter your name"
              error={errors.name}
            />

            <InputField
              id="profile-department"
              label="Department"
              value={form.department}
              onChange={(event) => setForm((prev) => ({ ...prev, department: event.target.value }))}
              placeholder="Enter your department"
              error={errors.department}
            />

            <InputField
              id="profile-semester"
              label="Semester"
              value={form.semester}
              onChange={(event) => setForm((prev) => ({ ...prev, semester: event.target.value }))}
              placeholder="Enter your semester"
              error={errors.semester}
            />

            <InputField
              id="profile-email"
              label="Email"
              value={user?.email || ''}
              disabled
              inputClassName="cursor-not-allowed bg-slate-100 text-slate-500"
            />

            {serverMessage && <p className="text-sm text-rose-500">{serverMessage}</p>}

            <div className="flex flex-wrap justify-end gap-3">
              <Button type="button" variant="ghost" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  )
}
