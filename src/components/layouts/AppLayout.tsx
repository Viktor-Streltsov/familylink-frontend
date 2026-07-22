import { Outlet, NavLink } from 'react-router-dom'
import { Home, Users, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/dashboard', icon: Home, label: 'Главная' },
  { to: '/families',  icon: Users, label: 'Семьи' },
  { to: '/profile',   icon: User,  label: 'Профиль' },
] as const

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-background)]">
      {/* Контент */}
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--color-border)] bg-white"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <ul className="flex h-16 items-center justify-around px-2">
          {navItems.map(({ to, icon: Icon, label }) => (
            <li key={to} className="flex-1">
              <NavLink
                to={to}
                className={({ isActive }) =>
                  cn(
                    'flex flex-col items-center gap-1 py-2 text-xs transition-colors',
                    isActive
                      ? 'text-[var(--color-brand)]'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={22}
                      strokeWidth={isActive ? 2.5 : 1.8}
                    />
                    <span>{label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
