import { useFamilySituations } from '@/features/situation/hooks'
import { SituationCard } from '@/features/situation/SituationCard'
import { EmptyState } from '@/components/shared/EmptyState'

interface SituationsListProps {
  familyId: string
}

export function SituationsList({ familyId }: SituationsListProps) {
  const { data: situations, isLoading, isError } = useFamilySituations(familyId)

  if (isLoading) {
    return (
      <p className="py-4 text-center text-sm text-[var(--color-text-muted)]">
        Загружаем ситуации...
      </p>
    )
  }

  if (isError) {
    return (
      <p className="py-4 text-center text-sm text-[var(--color-error)]">
        Не удалось загрузить ситуации
      </p>
    )
  }

  if (!situations?.length) {
    return (
      <EmptyState
        icon="💬"
        title="Пока нет обсуждений"
        subtitle="Создайте ситуацию, когда захотите вместе разобраться в непростом моменте"
      />
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {situations.map((situation) => (
        <SituationCard key={situation.id} situation={situation} />
      ))}
    </div>
  )
}
