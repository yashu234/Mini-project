import {
  Bell,
  LayoutDashboard,
  Menu,
  MessageCircle,
  PanelLeftClose,
  PanelLeftOpen,
  UserCircle,
  X,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { cn } from '../utils/cn'

const navItems = [
  { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/chat', label: 'Chat', icon: MessageCircle },
  { to: '/app/notifications', label: 'Notifications', icon: Bell },
  { to: '/app/profile', label: 'Profile', icon: UserCircle },
]

export default function Sidebar({ collapsed, onToggle }) {
  return (
    <>
      <button
        type="button"
        className="fixed right-4 top-4 z-40 rounded-xl border border-[var(--stroke)] bg-white p-2 text-[var(--text)] shadow md:hidden"
        onClick={onToggle}
        aria-label="Toggle menu"
      >
        {collapsed ? <Menu size={18} /> : <X size={18} />}
      </button>

      <aside
        className={cn(
          'fixed left-0 top-0 z-30 h-full w-72 border-r border-[var(--stroke)] bg-white/85 p-5 backdrop-blur-md transition-transform duration-300 md:sticky md:translate-x-0',
          collapsed ? '-translate-x-full md:w-24 md:translate-x-0' : 'translate-x-0',
        )}
      >
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="flex size-9 items-center justify-center rounded-2xl bg-[var(--brand)] text-sm font-semibold text-white">
            SS
          </div>
          {!collapsed && (
            <div>
              <p className="text-sm font-semibold text-[var(--text)]">Smart Support</p>
              <p className="text-xs text-[var(--muted)]">Student companion</p>
            </div>
          )}

          <button
            type="button"
            className="ml-auto hidden rounded-xl border border-[var(--stroke)] p-1.5 text-[var(--muted)] transition hover:bg-slate-100 md:inline-flex"
            onClick={onToggle}
            aria-label="Collapse sidebar"
          >
            {collapsed ? <PanelLeftOpen size={15} /> : <PanelLeftClose size={15} />}
          </button>
        </div>

        <nav className="space-y-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition',
                  isActive
                    ? 'bg-[var(--brand-soft)] text-[var(--brand)]'
                    : 'text-[var(--muted)] hover:bg-slate-100 hover:text-[var(--text)]',
                )
              }
            >
              <Icon size={17} />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}
