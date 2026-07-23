import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import {
  ChevronRight,
  Database,
  LogOut,
  Shield,
  User as UserIcon,
} from 'lucide-react'

import { getMe } from '@/api/userApi'
import { useAuthStore } from '@/stores/authStore'
import { formatDate } from '@/lib/formatDate'
import { UserAvatar } from '@/components/shared/UserAvatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { currentUser, setUser, logout } = useAuthStore()

  const { data: user, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    staleTime: 5 * 60 * 1000,
  })

  useEffect(() => {
    if (user) setUser(user)
  }, [user, setUser])

  const displayUser = currentUser ?? user

  const handleLogout = () => {
    logout()
    toast.success('Вы вышли из аккаунта')
    navigate('/login')
  }

  if (isLoading && !displayUser) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-[var(--color-text-muted)]">Загружаем профиль...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <header className="border-b border-[var(--color-border)] bg-white px-4 py-4">
        <h1
          className="text-2xl font-bold text-[var(--color-text-primary)]"
          style={{ fontFamily: 'Fraunces, serif' }}
        >
          Профиль
        </h1>
      </header>

      <main className="flex flex-col gap-4 px-4 pt-5 pb-8">
        <Card className="rounded-2xl border-[var(--color-border)] bg-white shadow-sm">
          <CardContent className="flex items-center gap-4 pt-4">
            <UserAvatar
              name={displayUser?.name ?? '?'}
              avatarUrl={displayUser?.avatarUrl}
              size="lg"
            />
            <div className="min-w-0">
              <p className="truncate text-lg font-bold text-[var(--color-text-primary)]">
                {displayUser?.name}
              </p>
              <p className="truncate text-sm text-[var(--color-text-muted)]">
                {displayUser?.email}
              </p>
              {displayUser?.createdAt && (
                <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                  С нами с {formatDate(displayUser.createdAt)}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <nav className="flex flex-col gap-2">
          <Link
            to="/settings/consents"
            className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3.5 shadow-sm transition-colors hover:bg-[var(--color-surface-warm)]"
          >
            <Shield size={20} className="text-[var(--color-brand)]" />
            <span className="flex-1 text-sm font-medium text-[var(--color-text-primary)]">
              Согласия
            </span>
            <ChevronRight size={18} className="text-[var(--color-text-muted)]" />
          </Link>
          <Link
            to="/settings/data"
            className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3.5 shadow-sm transition-colors hover:bg-[var(--color-surface-warm)]"
          >
            <Database size={20} className="text-[var(--color-brand)]" />
            <span className="flex-1 text-sm font-medium text-[var(--color-text-primary)]">
              Мои данные
            </span>
            <ChevronRight size={18} className="text-[var(--color-text-muted)]" />
          </Link>
        </nav>

        <Button
          type="button"
          variant="outline"
          onClick={handleLogout}
          className="mt-2 h-12 gap-2 rounded-xl border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-error)] hover:text-[var(--color-error)]"
        >
          <LogOut size={18} />
          Выйти
        </Button>

        <p className="flex items-center justify-center gap-1 text-xs text-[var(--color-text-muted)]">
          <UserIcon size={14} />
          FamilyLink бережно хранит ваши данные
        </p>
      </main>
    </div>
  )
}
