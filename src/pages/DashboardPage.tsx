import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { LogOut, Plus, UserPlus } from 'lucide-react'
import { toast } from 'sonner'

import { getMe } from '@/api/userApi'
import { useAuthStore } from '@/stores/authStore'
import { useMyFamilies } from '@/features/family/hooks'
import { FamilyCard } from '@/features/family/FamilyCard'
import { EmptyState } from '@/components/shared/EmptyState'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { currentUser, setUser, logout } = useAuthStore()

  /* Загружаем профиль если ещё нет в store */
  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: !currentUser,
    staleTime: 5 * 60 * 1000,
  })

  useEffect(() => {
    if (user) setUser(user)
  }, [user, setUser])

  const displayUser = currentUser ?? user

  /* Семьи */
  const { data: families, isLoading: familiesLoading } = useMyFamilies()

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
      <main className="px-4 pt-6 pb-8 flex flex-col gap-6">
        {/* Приветствие */}
        <section>
          <h1
            className="text-2xl font-bold text-[var(--color-text-primary)]"
            style={{ fontFamily: 'Fraunces, serif' }}
          >
            Здравствуйте,{' '}
            <span className="text-[var(--color-brand)]">
              {displayUser?.name ?? '...'}
            </span>{' '}
            👋
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Как дела у вашей семьи сегодня?
          </p>
        </section>

        {/* Секция «Мои семьи» */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2
              className="text-lg font-bold text-[var(--color-text-primary)]"
              style={{ fontFamily: 'Fraunces, serif' }}
            >
              Мои семьи
            </h2>
            {families && families.length > 0 && (
              <button
                onClick={() => navigate('/families/create')}
                className="flex items-center gap-1 text-xs font-medium text-[var(--color-brand)] hover:text-[var(--color-brand-hover)]"
              >
                <Plus size={14} />
                Создать
              </button>
            )}
          </div>

          {/* Загрузка */}
          {familiesLoading && (
            <div className="flex flex-col gap-3">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="h-28 animate-pulse rounded-2xl bg-[var(--color-border)]"
                />
              ))}
            </div>
          )}

          {/* Список семей */}
          {!familiesLoading && families && families.length > 0 && (
            <div className="flex flex-col gap-3">
              {families.map((family) => (
                <FamilyCard key={family.id} family={family} />
              ))}
            </div>
          )}

          {/* Пустое состояние */}
          {!familiesLoading && (!families || families.length === 0) && (
            <EmptyState
              icon="🏠"
              title="У вас пока нет семей"
              subtitle="Создайте свою семью или вступите в существующую по коду приглашения"
            />
          )}
        </section>

        {/* Кнопки действий — всегда видны, если семей мало */}
        {!familiesLoading && (
          <section className="flex flex-col gap-3">
            <Button
              onClick={() => navigate('/families/create')}
              className="h-12 w-full rounded-xl bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-hover)] text-base gap-2"
            >
              <Plus size={18} />
              Создать семью
            </Button>
            <Button
              onClick={() => navigate('/families/join')}
              variant="outline"
              className="h-12 w-full rounded-xl border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] text-base gap-2"
            >
              <UserPlus size={18} />
              Вступить по коду
            </Button>
          </section>
        )}
      </main>
    </div>
  )
}
