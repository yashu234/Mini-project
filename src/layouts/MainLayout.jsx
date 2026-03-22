import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(max-width: 767px)').matches) {
      setCollapsed(true)
    }
  }, [])

  return (
    <div className="min-h-screen md:grid md:grid-cols-[auto_1fr]">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((prev) => !prev)} />

      {!collapsed && (
        <button
          type="button"
          className="fixed inset-0 z-20 bg-black/20 md:hidden"
          onClick={() => setCollapsed(true)}
          aria-label="Close menu"
        />
      )}

      <motion.main
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 min-h-screen p-4 pt-16 md:p-8 md:pt-8"
      >
        <Outlet />
      </motion.main>
    </div>
  )
}
