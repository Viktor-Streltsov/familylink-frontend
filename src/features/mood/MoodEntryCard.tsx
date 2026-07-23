import { Lock } from 'lucide-react'

import type { Mood } from '@/types/mood'
import { UserAvatar } from '@/components/shared/UserAvatar'
import { MoodEmoji } from '@/components/shared/MoodEmoji'
import { formatTime } from '@/lib/formatDate'

interface MoodEntryCardProps {
  mood: Mood
}

export function MoodEntryCard({ mood }: MoodEntryCardProps) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-[var(--color-border)] bg-white p-4 shadow-sm">
      <UserAvatar
        name={mood.userName}
        avatarUrl={mood.userAvatar}
        size="md"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate font-semibold text-[var(--color-text-primary)]">
            {mood.userName}
          </span>
          {!mood.visibleToFamily && (
            <Lock
              size={14}
              className="shrink-0 text-[var(--color-text-muted)]"
              aria-label="Только для вас"
            />
          )}
        </div>
        {mood.note && (
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            {mood.note}
          </p>
        )}
        <p className="mt-1.5 text-xs text-[var(--color-text-muted)]">
          {formatTime(mood.createdAt)}
        </p>
      </div>
      <MoodEmoji type={mood.moodType} size="md" />
    </div>
  )
}
