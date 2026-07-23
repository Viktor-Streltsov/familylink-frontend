import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { Home, Users, User } from 'lucide-react'
import { cn } from '@/lib/utils'

export function AppLayout() {
  const { pathname } = useLocation()

  /* Определяем активную вкладку по текущему пути */
  const activeTab = pathname.startsWith('/profile')
    ? 'profile'
    : pathname.startsWith('/dashboard')
      ? 'home'
      : 'home'

  const navItems = [
    {
      id: 'home' as const,
      to: '/dashboard',
      icon: Home,
      label: 'Главная',
    },
    {
      id: 'families' as const,
      to: '/dashboard',
      icon: Users,
      label: 'Семьи',
    },
    {
      id: 'profile' as const,
      to: '/profile',
      icon: User,
      label: 'Профиль',
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-background)]">
      {/* Контент страницы */}
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--color-border)] bg-white"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <ul className="flex h-16 items-center justify-around px-2">
          {navItems.map(({ id, to, icon: Icon, label }) => {
            const active =
              id === 'profile'
                ? activeTab === 'profile'
                : activeTab === 'home'
            return (
              <li key={id} className="flex-1">
                <NavLink
                  to={to}
                  className={cn(
                    'flex flex-col items-center gap-1 py-2 text-xs transition-colors',
                    active
                      ? 'text-[var(--color-brand)]'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
                  )}
                  aria-label={label}
                >
                  <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
                  <span>{label}</span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
