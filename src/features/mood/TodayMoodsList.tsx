import { useTodayMoods } from '@/features/mood/hooks'
import { MoodEntryCard } from '@/features/mood/MoodEntryCard'
import { EmptyState } from '@/components/shared/EmptyState'

interface TodayMoodsListProps {
  familyId: string
}

export function TodayMoodsList({ familyId }: TodayMoodsListProps) {
  const { data: moods, isLoading, isError } = useTodayMoods(familyId)

  if (isLoading) {
    return (
      <p className="py-4 text-center text-sm text-[var(--color-text-muted)]">
        Загружаем настроения...
      </p>
    )
  }

  if (isError) {
    return (
      <p className="py-4 text-center text-sm text-[var(--color-error)]">
        Не удалось загрузить настроения
      </p>
    )
  }

  if (!moods?.length) {
    return (
      <EmptyState
        icon="🌤️"
        title="Пока никто не отметился"
        subtitle="Будет здорово, если кто-то из семьи поделится, как проходит день"
      />
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {moods.map((mood) => (
        <MoodEntryCard key={mood.id} mood={mood} />
      ))}
    </div>
  )
}
