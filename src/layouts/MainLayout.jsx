import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import ThemeToggle from '../components/ui/ThemeToggle'
import useAuth from '../hooks/useAuth'

export default function MainLayout() {
  const location = useLocation()
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

      <div className="fixed right-16 top-4 z-40 md:right-8 md:top-8">
        <ThemeToggle />
      </div>

      <main className="relative z-10 min-h-screen bg-transparent p-4 pt-16 transition duration-300 md:p-8 md:pt-8">
        <div key={location.pathname} className="animate-page-enter">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
