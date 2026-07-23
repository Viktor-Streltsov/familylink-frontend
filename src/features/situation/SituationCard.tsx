import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

import type { Situation } from '@/types/situation'
import { SituationCategoryIcon } from '@/components/shared/SituationCategoryIcon'
import { SituationStatusBadge } from '@/components/shared/SituationStatusBadge'
import { cn } from '@/lib/utils'

interface SituationCardProps {
  situation: Situation
  className?: string
}

export function SituationCard({ situation, className }: SituationCardProps) {
  const navigate = useNavigate()

  const descCount = situation.submittedDescriptionsCount
  const partCount = situation.participantsCount

  return (
    <button
      type="button"
      onClick={() => navigate(`/situations/${situation.id}`)}
      className={cn(
        'group flex w-full items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-white p-4 text-left shadow-sm transition-all duration-200 hover:border-[var(--color-brand-light)] hover:shadow-md active:scale-[0.99]',
        className
      )}
    >
      <SituationCategoryIcon category={situation.category} size="md" />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3
            className="truncate text-base font-bold text-[var(--color-text-primary)]"
            style={{ fontFamily: 'Fraunces, serif' }}
          >
            {situation.title}
          </h3>
          <SituationStatusBadge status={situation.status} />
        </div>
        <p className="mt-1 text-xs text-[var(--color-text-muted)]">
          {descCount} {pluralDescriptions(descCount)} / {partCount}{' '}
          {pluralParticipants(partCount)}
        </p>
      </div>

      <ChevronRight
        size={18}
        className="shrink-0 text-[var(--color-text-muted)] transition-transform group-hover:translate-x-0.5"
      />
    </button>
  )
}

function pluralDescriptions(n: number): string {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return 'описание'
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20))
    return 'описания'
  return 'описаний'
}

function pluralParticipants(n: number): string {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return 'участник'
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20))
    return 'участника'
  return 'участников'
}
