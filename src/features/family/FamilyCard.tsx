import { useNavigate } from 'react-router-dom'
import { Users, Copy, ChevronRight } from 'lucide-react'
import { toast } from 'sonner'

import type { Family } from '@/types/family'
import { cn } from '@/lib/utils'

interface FamilyCardProps {
  family: Family
  className?: string
}

export function FamilyCard({ family, className }: FamilyCardProps) {
  const navigate = useNavigate()

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation()
    void navigator.clipboard.writeText(family.inviteCode).then(() => {
      toast.success('Код скопирован', {
        description: family.inviteCode,
      })
    })
  }

  return (
    <button
      onClick={() => navigate(`/families/${family.id}`)}
      className={cn(
        'group w-full rounded-2xl border border-[var(--color-border)] bg-white p-5 text-left shadow-sm transition-all duration-200 hover:border-[var(--color-brand-light)] hover:shadow-md active:scale-[0.98]',
        className
      )}
    >
      {/* Заголовок */}
      <div className="flex items-start justify-between gap-2">
        <h3
          className="text-base font-bold text-[var(--color-text-primary)] leading-tight"
          style={{ fontFamily: 'Fraunces, serif' }}
        >
          {family.name}
        </h3>
        <ChevronRight
          size={18}
          className="mt-0.5 flex-shrink-0 text-[var(--color-text-muted)] transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </div>

      {/* Счётчик участников */}
      <div className="mt-3 flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)]">
        <Users size={15} className="text-[var(--color-text-muted)]" />
        <span>
          {family.membersCount}{' '}
          {pluralMembers(family.membersCount)}
        </span>
      </div>

      {/* Invite code */}
      <div className="mt-3 flex items-center justify-between rounded-xl bg-[var(--color-surface-warm)] px-3 py-2">
        <span
          className="text-xs text-[var(--color-text-muted)]"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          {family.inviteCode}
        </span>
        <button
          onClick={handleCopyCode}
          className="ml-2 flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-[var(--color-brand)] transition-colors hover:bg-[var(--color-brand-light)]"
          aria-label="Скопировать код"
        >
          <Copy size={13} />
          <span>Скопировать</span>
        </button>
      </div>
    </button>
  )
}

function pluralMembers(n: number): string {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return 'участник'
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'участника'
  return 'участников'
}
