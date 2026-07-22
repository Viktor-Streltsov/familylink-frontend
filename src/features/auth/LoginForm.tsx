import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'

import { login } from '@/api/authApi'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { ApiError } from '@/types/api'

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Введите email')
    .email('Некорректный формат email'),
  password: z
    .string()
    .min(1, 'Введите пароль')
    .min(8, 'Пароль должен содержать минимум 8 символов'),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
  const navigate = useNavigate()
  const { login: storeLogin } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      storeLogin(data.token, {
        id: data.userId,
        email: data.email,
        name: data.name,
      })
      navigate('/dashboard')
    },
    onError: (error: unknown) => {
      let message = 'Произошла ошибка. Попробуйте позже.'
      if (axios.isAxiosError(error)) {
        const apiErr = error.response?.data as ApiError | undefined
        if (error.response?.status === 401) {
          message = 'Неверный email или пароль'
        } else if (apiErr?.message) {
          message = apiErr.message
        }
      }
      toast.error(message)
    },
  })

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="вы@пример.рф"
          autoComplete="email"
          aria-invalid={!!errors.email}
          {...register('email')}
        />
        {errors.email && (
          <p className="text-xs text-[var(--color-error)]">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Пароль</Label>
        <Input
          id="password"
          type="password"
          placeholder="Минимум 8 символов"
          autoComplete="current-password"
          aria-invalid={!!errors.password}
          {...register('password')}
        />
        {errors.password && (
          <p className="text-xs text-[var(--color-error)]">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={mutation.isPending}
        className="mt-2 h-11 w-full rounded-xl bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-hover)] transition-colors"
      >
        {mutation.isPending ? 'Входим...' : 'Войти'}
      </Button>
    </form>
  )
}
