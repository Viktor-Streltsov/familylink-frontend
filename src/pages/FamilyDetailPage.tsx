import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Users } from 'lucide-react'

import { useMyFamilies, useFamilyMembers } from '@/features/family/hooks'
import { InviteCodeDisplay } from '@/features/family/InviteCodeDisplay'
import { FamilyMemberList } from '@/features/family/FamilyMemberList'

export default function FamilyDetailPage() {
  const { familyId } = useParams<{ familyId: string }>()
  const navigate = useNavigate()

  const { data: families, isLoading: familiesLoading } = useMyFamilies()
  const { data: members, isLoading: membersLoading } = useFamilyMembers(familyId ?? '')

  const family = families?.find((f) => f.id === familyId)

  /* ─── Загрузка ─── */
  if (familiesLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)]">
        <p className="text-sm text-[var(--color-text-muted)]">Загружаем данные...</p>
      </div>
    )
  }

  /* ─── Семья не найдена ─── */
  if (!family) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[var(--color-background)] px-6">
        <p className="text-2xl">🏠</p>
        <p
          className="text-xl font-bold text-[var(--color-text-primary)]"
          style={{ fontFamily: 'Fraunces, serif' }}
        >
          Семья не найдена
        </p>
        <p className="text-sm text-[var(--color-text-muted)]">
          Возможно, вы не являетесь участником этой семьи
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-2 text-sm font-medium text-[var(--color-brand)]"
        >
          ← На главную
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Шапка */}
      <header className="flex items-center gap-3 border-b border-[var(--color-border)] bg-white px-4 py-3">
        <button
          onClick={() => navigate(-1)}
          className="flex h-8 w-8 items-center justify-center rounded-xl text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-warm)]"
          aria-label="Назад"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1 min-w-0">
          <h1
            className="truncate text-lg font-bold text-[var(--color-text-primary)]"
            style={{ fontFamily: 'Fraunces, serif' }}
          >
            {family.name}
          </h1>
        </div>
      </header>

      {/* Контент */}
      <main className="px-4 pt-5 pb-8 flex flex-col gap-6">
        {/* Код приглашения */}
        <section>
          <InviteCodeDisplay inviteCode={family.inviteCode} />
        </section>

        {/* Участники */}
        <section>
          <div className="mb-3 flex items-center gap-2">
            <Users size={18} className="text-[var(--color-text-muted)]" />
            <h2
              className="text-base font-bold text-[var(--color-text-primary)]"
              style={{ fontFamily: 'Fraunces, serif' }}
            >
              Участники
            </h2>
            <span className="ml-auto text-sm text-[var(--color-text-muted)]">
              {family.membersCount}
            </span>
          </div>

          {membersLoading ? (
            <p className="py-6 text-center text-sm text-[var(--color-text-muted)]">
              Загружаем участников...
            </p>
          ) : (
            <FamilyMemberList members={members ?? []} />
          )}
        </section>

        {/* Заглушка — сюда завтра добавим Mood и Situations */}
        <section className="rounded-2xl border border-dashed border-[var(--color-border)] px-4 py-6 text-center">
          <p className="text-sm text-[var(--color-text-muted)]">
            Настроение и ситуации — завтра 🌿
          </p>
        </section>
      </main>
    </div>
  )
}
