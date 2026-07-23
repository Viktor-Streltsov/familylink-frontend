import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

/** Заглушка — полная форма описания будет в следующей итерации */
export default function SubmitDescriptionPage() {
  const { situationId } = useParams<{ situationId: string }>()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <header className="flex items-center gap-3 border-b border-[var(--color-border)] bg-white px-4 py-3">
        <button
          type="button"
          onClick={() => navigate(`/situations/${situationId ?? ''}`)}
          className="flex h-8 w-8 items-center justify-center rounded-xl text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-warm)]"
          aria-label="Назад"
        >
          <ArrowLeft size={20} />
        </button>
        <h1
          className="text-lg font-bold text-[var(--color-text-primary)]"
          style={{ fontFamily: 'Fraunces, serif' }}
        >
          Ваше описание
        </h1>
      </header>
      <main className="px-4 pt-8 text-center">
        <p className="text-sm text-[var(--color-text-muted)]">
          Форма описания появится в следующем обновлении 🌿
        </p>
      </main>
    </div>
  )
}
