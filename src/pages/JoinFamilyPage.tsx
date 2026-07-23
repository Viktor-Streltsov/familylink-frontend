import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'
import axios from 'axios'

import { useJoinFamily } from '@/features/family/hooks'
import { RoleSelector } from '@/features/family/RoleSelector'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { ApiError } from '@/types/api'
import type { FamilyRole } from '@/types/family'

const schema = z.object({
  inviteCode: z
    .string()
    .min(1, 'Введите код приглашения')
    .regex(/^FAM-[A-Z0-9]{6}$/, 'Формат кода: FAM-XXXXXX'),
  role: z.enum(['PARENT', 'CHILD', 'GUARDIAN', 'OTHER'] as const, {
    error: 'Выберите вашу роль в семье',
  }),
})

type FormData = z.infer<typeof schema>

export default function JoinFamilyPage() {
  const navigate = useNavigate()
  const { mutate, isPending } = useJoinFamily()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    setSubmitError(null)
    mutate(data, {
      onSuccess: (family) => {
        toast.success(`Вы вступили в семью «${family.name}»!`)
        navigate(`/families/${family.id}`)
      },
      onError: (error: unknown) => {
        let message = 'Не удалось вступить в семью. Попробуйте позже.'
        if (axios.isAxiosError(error)) {
          const apiErr = error.response?.data as ApiError | undefined
          if (error.response?.status === 404) {
            message = 'Семья с таким кодом не найдена'
          } else if (error.response?.status === 409) {
            message = 'Вы уже состоите в этой семье'
          } else if (apiErr?.message) {
            message = apiErr.message
          }
        }
        setSubmitError(message)
        toast.error(message)
      },
    })
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Шапка */}
      <header className="flex items-center gap-3 border-b border-[var(--color-border)] bg-white px-4 py-3">
        <button
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
          Вступить в семью
        </h1>
      </header>

      {/* Форма */}
      <main className="px-4 pt-6 pb-8">
        {/* Подсказка */}
        <div className="mb-5 rounded-2xl bg-[var(--color-surface-warm)] border border-[var(--color-border)] px-4 py-3">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Попросите кого-то из семьи поделиться кодом приглашения вида{' '}
            <span
              className="font-medium text-[var(--color-brand)]"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              FAM-A7X2K9
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Код */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="inviteCode">Код приглашения</Label>
            <Input
              id="inviteCode"
              type="text"
              placeholder="FAM-A7X2K9"
              autoCapitalize="characters"
              aria-invalid={!!errors.inviteCode}
              style={{ fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.1em' }}
              {...register('inviteCode')}
            />
            {errors.inviteCode && (
              <p className="text-xs text-[var(--color-error)]">
                {errors.inviteCode.message}
              </p>
            )}
          </div>

          {/* Роль */}
          <div className="flex flex-col gap-1.5">
            <Label>Ваша роль в этой семье</Label>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <RoleSelector
                  value={field.value ?? ''}
                  onChange={(role: FamilyRole) => field.onChange(role)}
                  error={errors.role?.message}
                />
              )}
            />
          </div>

          {/* Общая ошибка */}
          {submitError && (
            <p className="rounded-xl bg-[#FDE8E8] px-4 py-2.5 text-sm text-[var(--color-error)]">
              {submitError}
            </p>
          )}

          <Button
            type="submit"
            disabled={isPending}
            className="mt-2 h-12 w-full rounded-xl bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-hover)] text-base"
          >
            {isPending ? 'Вступаем...' : 'Вступить'}
          </Button>
        </form>
      </main>
    </div>
  )
}
