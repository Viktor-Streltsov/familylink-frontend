import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'

import { ConsentType } from '@/types/consent'
import { MoodType } from '@/types/mood'
import type { ApiError } from '@/types/api'
import { ConsentGuard } from '@/components/shared/ConsentGuard'
import { MoodPicker } from '@/components/shared/MoodPicker'
import { useCreateMood } from '@/features/mood/hooks'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'

export default function TrackMoodPage() {
  const { familyId } = useParams<{ familyId: string }>()
  const navigate = useNavigate()
  const id = familyId ?? ''

  return (
    <ConsentGuard consentType={ConsentType.MOOD_TRACKING}>
      <TrackMoodForm familyId={id} onDone={() => navigate(`/families/${id}`)} />
    </ConsentGuard>
  )
}

interface TrackMoodFormProps {
  familyId: string
  onDone: () => void
}

function TrackMoodForm({ familyId, onDone }: TrackMoodFormProps) {
  const navigate = useNavigate()
  const { mutate, isPending } = useCreateMood(familyId)
  const [moodType, setMoodType] = useState<MoodType | null>(null)
  const [note, setNote] = useState('')
  const [visibleToFamily, setVisibleToFamily] = useState(true)
  const [moodError, setMoodError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!moodType) {
      setMoodError('Выберите, как вы себя чувствуете')
      return
    }
    setMoodError(null)

    mutate(
      {
        moodType,
        note: note.trim() || undefined,
        visibleToFamily,
      },
      {
        onSuccess: () => {
          toast.success('Спасибо, что поделились')
          onDone()
        },
        onError: (error: unknown) => {
          let message = 'Не удалось сохранить. Попробуйте позже.'
          if (axios.isAxiosError(error)) {
            const apiErr = error.response?.data as ApiError | undefined
            if (apiErr?.message) message = apiErr.message
          }
          toast.error(message)
        },
      }
    )
  }

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
          Настроение
        </h1>
      </header>

      <main className="px-4 pt-6 pb-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <h2
              className="mb-4 text-center text-2xl font-bold text-[var(--color-text-primary)]"
              style={{ fontFamily: 'Fraunces, serif' }}
            >
              Как вы сейчас?
            </h2>
            <MoodPicker value={moodType} onChange={setMoodType} />
            {moodError && (
              <p className="mt-3 text-center text-xs text-[var(--color-error)]">
                {moodError}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="mood-note">Заметка (необязательно)</Label>
            <Textarea
              id="mood-note"
              value={note}
              onChange={(e) => setNote(e.target.value.slice(0, 500))}
              placeholder="Хотите что-то добавить?"
              className="min-h-24 rounded-xl border-[var(--color-border)] bg-white"
              maxLength={500}
            />
            <p className="text-right text-xs text-[var(--color-text-muted)]">
              {note.length}/500
            </p>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3">
            <div>
              <p className="text-sm font-medium text-[var(--color-text-primary)]">
                Показать семье
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">
                Семья увидит вашу отметку в списке на сегодня
              </p>
            </div>
            <Switch
              checked={visibleToFamily}
              onCheckedChange={setVisibleToFamily}
            />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="h-12 w-full rounded-xl bg-[var(--color-brand)] text-base text-white hover:bg-[var(--color-brand-hover)]"
          >
            {isPending ? 'Сохраняем...' : 'Сохранить'}
          </Button>
        </form>
      </main>
    </div>
  )
}
