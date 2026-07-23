import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Shield } from 'lucide-react'

import { CONSENT_TYPE_ORDER } from '@/features/consent/constants'
import { ConsentCard } from '@/features/consent/ConsentCard'

export default function ConsentsPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <header className="flex items-center gap-3 border-b border-[var(--color-border)] bg-white px-4 py-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-8 w-8 items-center justify-center rounded-xl text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-warm)]"
          aria-label="Назад"
        >
          <ArrowLeft size={20} />
        </button>
        <h1
          className="text-lg font-bold text-[var(--color-text-primary)]"
          style={{ fontFamily: 'Fraunces, serif' }}
        >
          Согласия
        </h1>
      </header>

      <main className="flex flex-col gap-4 px-4 pt-5 pb-8">
        <div className="flex items-start gap-3 rounded-2xl bg-[var(--color-surface-warm)] p-4">
          <Shield size={20} className="mt-0.5 shrink-0 text-[var(--color-brand)]" />
          <p className="text-sm text-[var(--color-text-secondary)]">
            Здесь вы управляете тем, на что даёте согласие. Отзыв не удаляет
            автоматически старые данные — для этого есть раздел «Мои данные».
          </p>
        </div>

        {CONSENT_TYPE_ORDER.map((type) => (
          <ConsentCard key={type} consentType={type} />
        ))}
      </main>
    </div>
  )
}
