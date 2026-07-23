import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'
import axios from 'axios'

import { useCreateFamily } from '@/features/family/hooks'
import { RoleSelector } from '@/features/family/RoleSelector'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { ApiError } from '@/types/api'
import type { FamilyRole } from '@/types/family'

const schema = z.object({
  name: z
    .string()
    .min(1, 'Введите название семьи')
    .min(2, 'Название должно содержать минимум 2 символа')
    .max(100, 'Название слишком длинное'),
  creatorRole: z.enum(['PARENT', 'CHILD', 'GUARDIAN', 'OTHER'] as const, {
    error: 'Выберите вашу роль в семье',
  }),
})

type FormData = z.infer<typeof schema>

export default function CreateFamilyPage() {
  const navigate = useNavigate()
  const { mutate, isPending } = useCreateFamily()
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
        toast.success(`Семья «${family.name}» создана!`)
        navigate(`/families/${family.id}`)
      },
      onError: (error: unknown) => {
        let message = 'Не удалось создать семью. Попробуйте позже.'
        if (axios.isAxiosError(error)) {
          const apiErr = error.response?.data as ApiError | undefined
          if (apiErr?.message) message = apiErr.message
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
          Создать семью
        </h1>
      </header>

      {/* Форма */}
      <main className="px-4 pt-6 pb-8">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Название */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Название семьи</Label>
            <Input
              id="name"
              type="text"
              placeholder="Например: Семья Ивановых"
              aria-invalid={!!errors.name}
              {...register('name')}
            />
            {errors.name && (
              <p className="text-xs text-[var(--color-error)]">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Роль */}
          <div className="flex flex-col gap-1.5">
            <Label>Ваша роль в семье</Label>
            <Controller
              name="creatorRole"
              control={control}
              render={({ field }) => (
                <RoleSelector
                  value={field.value ?? ''}
                  onChange={(role: FamilyRole) => field.onChange(role)}
                  error={errors.creatorRole?.message}
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
            {isPending ? 'Создаём...' : 'Создать семью'}
          </Button>
        </form>
      </main>
    </div>
  )
}
