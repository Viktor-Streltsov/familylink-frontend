import { CheckCircle2, Clock } from 'lucide-react'

import type { SituationParticipant } from '@/types/situation'
import type { FamilyRole } from '@/types/family'
import { UserAvatar } from '@/components/shared/UserAvatar'
import { RoleBadge } from '@/components/shared/RoleBadge'
import { cn } from '@/lib/utils'

interface SituationParticipantCardProps {
  participant: SituationParticipant
  role?: FamilyRole
  className?: string
}

export function SituationParticipantCard({
  participant,
  role,
  className,
}: SituationParticipantCardProps) {
  const submitted = participant.hasSubmitted

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-white p-4 shadow-sm',
        className
      )}
    >
      <UserAvatar name={participant.userName} size="md" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="truncate font-semibold text-[var(--color-text-primary)]">
            {participant.userName}
          </span>
          {role && <RoleBadge role={role} />}
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-xs">
          {submitted ? (
            <>
              <CheckCircle2
                size={14}
                className="text-[var(--color-success)]"
              />
              <span className="text-[var(--color-success)]">
                Описание отправлено
              </span>
            </>
          ) : (
            <>
              <Clock size={14} className="text-[var(--color-text-muted)]" />
              <span className="text-[var(--color-text-muted)]">
                Ждём описание
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
