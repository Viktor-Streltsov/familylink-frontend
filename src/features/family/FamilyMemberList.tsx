import type { FamilyMember } from '@/types/family'
import { UserAvatar } from '@/components/shared/UserAvatar'
import { RoleBadge } from '@/components/shared/RoleBadge'

interface FamilyMemberListProps {
  members: FamilyMember[]
}

export function FamilyMemberList({ members }: FamilyMemberListProps) {
  if (members.length === 0) {
    return (
      <p className="py-4 text-center text-sm text-[var(--color-text-muted)]">
        Пока нет участников
      </p>
    )
  }

  return (
    <ul className="grid grid-cols-2 gap-3">
      {members.map((member) => (
        <li
          key={member.memberId}
          className="flex flex-col items-center gap-2 rounded-2xl border border-[var(--color-border)] bg-white p-4 text-center"
        >
          <UserAvatar
            name={member.userName}
            avatarUrl={member.avatarUrl}
            size="lg"
          />
          <div>
            <p className="text-sm font-semibold text-[var(--color-text-primary)] leading-tight">
              {member.userName}
            </p>
            <p className="mt-0.5 text-xs text-[var(--color-text-muted)] truncate max-w-[120px]">
              {member.userEmail}
            </p>
          </div>
          <RoleBadge role={member.role} />
        </li>
      ))}
    </ul>
  )
}
