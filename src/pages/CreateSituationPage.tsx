import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'

import type { SituationCategory } from '@/types/situation'
import type { ApiError } from '@/types/api'
import { useCreateSituation } from '@/features/situation/hooks'
import { CategoryPicker } from '@/features/situation/CategoryPicker'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function CreateSituationPage() {
  const { familyId } = useParams<{ familyId: string }>()
  const navigate = useNavigate()
  const id = familyId ?? ''

  const [step, setStep] = useState<1 | 2>(1)
  const [category, setCategory] = useState<SituationCategory | null>(null)
  const [title, setTitle] = useState('')
  const [categoryError, setCategoryError] = useState<string | null>(null)
  const [titleError, setTitleError] = useState<string | null>(null)

  const { mutate, isPending } = useCreateSituation(id)

  const goNext = () => {
    if (!category) {
      setCategoryError('Выберите категорию')
      return
    }
    setCategoryError(null)
    setStep(2)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (trimmed.length < 3) {
      setTitleError('Заголовок должен быть не короче 3 символов')
      return
    }
    if (trimmed.length > 200) {
      setTitleError('Заголовок не длиннее 200 символов')
      return
    }
    if (!category) return

    setTitleError(null)
    mutate(
      { title: trimmed, category },
      {
        onSuccess: (situation) => {
          toast.success('Ситуация создана')
          navigate(`/situations/${situation.id}`)
        },
        onError: (error: unknown) => {
          let message = 'Не удалось создать ситуацию. Попробуйте позже.'
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
          onClick={() => (step === 2 ? setStep(1) : navigate(-1))}
          className="flex h-8 w-8 items-center justify-center rounded-xl text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-warm)]"
          aria-label="Назад"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1
            className="text-lg font-bold text-[var(--color-text-primary)]"
            style={{ fontFamily: 'Fraunces, serif' }}
          >
            Новая ситуация
          </h1>
          <p className="text-xs text-[var(--color-text-muted)]">
            Шаг {step} из 2
          </p>
        </div>
      </header>

      <main className="px-4 pt-6 pb-8">
        {step === 1 && (
          <div className="flex flex-col gap-5">
            <div>
              <h2
                className="mb-4 text-xl font-bold text-[var(--color-text-primary)]"
                style={{ fontFamily: 'Fraunces, serif' }}
              >
                О чём хотите поговорить?
              </h2>
              <CategoryPicker value={category} onChange={setCategory} />
              {categoryError && (
                <p className="mt-3 text-xs text-[var(--color-error)]">
                  {categoryError}
                </p>
              )}
            </div>
            <Button
              type="button"
              onClick={goNext}
              className="h-12 w-full rounded-xl bg-[var(--color-brand)] text-base text-white hover:bg-[var(--color-brand-hover)]"
            >
              Дальше
            </Button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="situation-title">Краткий заголовок</Label>
              <Input
                id="situation-title"
                value={title}
                onChange={(e) => setTitle(e.target.value.slice(0, 200))}
                placeholder="Например: Не хочет делать домашку"
                className="rounded-xl border-[var(--color-border)]"
                autoFocus
              />
              <div className="flex justify-between text-xs">
                {titleError ? (
                  <span className="text-[var(--color-error)]">{titleError}</span>
                ) : (
                  <span className="text-[var(--color-text-muted)]">
                    От 3 до 200 символов
                  </span>
                )}
                <span className="text-[var(--color-text-muted)]">
                  {title.length}/200
                </span>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="h-12 w-full rounded-xl bg-[var(--color-brand)] text-base text-white hover:bg-[var(--color-brand-hover)]"
            >
              {isPending ? 'Создаём...' : 'Создать ситуацию'}
            </Button>
          </form>
        )}
      </main>
    </div>
  )
}
