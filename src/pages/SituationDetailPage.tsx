import { useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { ArrowLeft, MessageSquarePlus, UserPlus } from 'lucide-react'

import type { ApiError } from '@/types/api'
import type { FamilyRole } from '@/types/family'
import { useAuthStore } from '@/stores/authStore'
import { useSituation, useJoinSituation } from '@/features/situation/hooks'
import { useFamilyMembers } from '@/features/family/hooks'
import { SituationCategoryIcon } from '@/components/shared/SituationCategoryIcon'
import { SituationStatusBadge } from '@/components/shared/SituationStatusBadge'
import { SituationParticipantCard } from '@/features/situation/SituationParticipantCard'
import { SITUATION_CATEGORY_LABELS } from '@/features/situation/constants'
import { formatDate } from '@/lib/formatDate'
import { Button } from '@/components/ui/button'

export default function SituationDetailPage() {
  const { situationId } = useParams<{ situationId: string }>()
  const navigate = useNavigate()
  const id = situationId ?? ''

  const { currentUser } = useAuthStore()
  const { data: situation, isLoading, isError } = useSituation(id)
  const { data: members } = useFamilyMembers(situation?.familyId ?? '')
  const { mutate: join, isPending: joining } = useJoinSituation(id)

  const roleByUserId = useMemo(() => {
    const map = new Map<string, FamilyRole>()
    members?.forEach((m) => map.set(m.userId, m.role))
    return map
  }, [members])

  const currentParticipant = situation?.participants?.find(
    (p) => p.userId === currentUser?.id
  )
  const isParticipant = !!currentParticipant
  const needsDescription =
    isParticipant && currentParticipant && !currentParticipant.hasSubmitted

  const handleJoin = () => {
    join(undefined, {
      onSuccess: () => {
        toast.success('Вы присоединились к обсуждению')
      },
      onError: (error: unknown) => {
        let message = 'Не удалось присоединиться. Попробуйте позже.'
        if (axios.isAxiosError(error)) {
          const apiErr = error.response?.data as ApiError | undefined
          if (apiErr?.message) message = apiErr.message
        }
        toast.error(message)
      },
    })
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)]">
        <p className="text-sm text-[var(--color-text-muted)]">Загружаем...</p>
      </div>
    )
  }

  if (isError || !situation) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[var(--color-background)] px-6">
        <p className="text-sm text-[var(--color-text-muted)]">
          Ситуация не найдена или недоступна
        </p>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-sm font-medium text-[var(--color-brand)]"
        >
          ← Назад
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <header className="border-b border-[var(--color-border)] bg-white px-4 py-3">
        <div className="mb-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(`/families/${situation.familyId}`)}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-warm)]"
            aria-label="Назад"
          >
            <ArrowLeft size={20} />
          </button>
          <SituationCategoryIcon category={situation.category} size="sm" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1
                className="text-lg font-bold text-[var(--color-text-primary)]"
                style={{ fontFamily: 'Fraunces, serif' }}
              >
                {situation.title}
              </h1>
              <SituationStatusBadge status={situation.status} />
            </div>
            <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
              {SITUATION_CATEGORY_LABELS[situation.category]} ·{' '}
              {situation.createdByName} · {formatDate(situation.createdAt)}
            </p>
          </div>
        </div>
      </header>

      <main className="flex flex-col gap-6 px-4 pt-5 pb-8">
        <section>
          <h2
            className="mb-3 text-base font-bold text-[var(--color-text-primary)]"
            style={{ fontFamily: 'Fraunces, serif' }}
          >
            Участники
          </h2>
          <div className="flex flex-col gap-3">
            {(situation.participants ?? []).map((participant) => (
              <SituationParticipantCard
                key={participant.id}
                participant={participant}
                role={roleByUserId.get(participant.userId)}
              />
            ))}
            {!situation.participants?.length && (
              <p className="text-sm text-[var(--color-text-muted)]">
                Пока нет участников
              </p>
            )}
          </div>
        </section>

        {!isParticipant && (
          <Button
            type="button"
            onClick={handleJoin}
            disabled={joining}
            variant="outline"
            className="h-11 gap-2 rounded-xl border-[var(--color-border)]"
          >
            <UserPlus size={18} />
            {joining ? 'Присоединяем...' : 'Присоединиться'}
          </Button>
        )}

        {needsDescription && (
          <Button
            asChild
            className="h-11 gap-2 rounded-xl bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-hover)]"
          >
            <Link to={`/situations/${situation.id}/description`}>
              <MessageSquarePlus size={18} />
              Написать своё описание
            </Link>
          </Button>
        )}
      </main>
    </div>
  )
}
