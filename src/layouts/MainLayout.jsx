import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import useAuth from '../hooks/useAuth'

export default function MainLayout() {
  const navigate = useNavigate()
  const { logout, user } = useAuth()
  const [collapsed, setCollapsed] = useState(() => window.matchMedia('(max-width: 767px)').matches)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)')
    const updateState = () => setCollapsed(media.matches)

    media.addEventListener('change', updateState)
    return () => media.removeEventListener('change', updateState)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen md:grid md:grid-cols-[auto_1fr]">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((prev) => !prev)}
        onLogout={handleLogout}
        userName={user?.name || 'Student'}
        userEmail={user?.email || ''}
      />

      {!collapsed && (
        <button
          type="button"
          className="fixed inset-0 z-20 bg-black/20 md:hidden"
          onClick={() => setCollapsed(true)}
          aria-label="Close menu"
        />
      )}

      <main className="relative z-10 min-h-screen p-4 pt-16 transition duration-300 md:p-8 md:pt-8">
        <Outlet />
      </main>
    </div>
  )
}
