import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { toast } from 'sonner'

import { getMe } from '@/api/userApi'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { currentUser, setUser, logout } = useAuthStore()

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: !currentUser,
    staleTime: 5 * 60 * 1000, // 5 минут
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

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Шапка */}
      <header className="flex items-center justify-between border-b border-[var(--color-border)] bg-white px-4 py-3">
        <span
          className="text-xl font-bold text-[var(--color-brand)]"
          style={{ fontFamily: 'Fraunces, serif' }}
        >
          FamilyLink
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="text-[var(--color-text-muted)] hover:text-[var(--color-error)]"
          aria-label="Выйти"
        >
          <LogOut size={20} />
        </Button>
      </header>

      {/* Контент */}
      <main className="px-4 pt-8">
        {/* Приветствие */}
        <div className="mb-6">
          <h1
            className="text-3xl font-bold text-[var(--color-text-primary)]"
            style={{ fontFamily: 'Fraunces, serif' }}
          >
            Здравствуйте,{' '}
            <span className="text-[var(--color-brand)]">
              {displayUser?.name ?? '...'}
            </span>{' '}
            👋
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Как вы себя чувствуете сегодня?
          </p>
        </div>

        {/* Заглушка — дальше будут фичи */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-warm)] p-6 text-center">
          <p className="text-2xl mb-2">🏠</p>
          <p className="font-medium text-[var(--color-text-primary)]">Скоро здесь появится ваша семья</p>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Создайте семью или вступите по коду приглашения
          </p>
        </div>
      </main>
    </div>
  )
}
