import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'

import { register as registerUser } from '@/api/authApi'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { ApiError } from '@/types/api'

const registerSchema = z.object({
  name: z
    .string()
    .min(1, 'Введите ваше имя')
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(100, 'Имя слишком длинное'),
  email: z
    .string()
    .min(1, 'Введите email')
    .email('Некорректный формат email'),
  password: z
    .string()
    .min(1, 'Введите пароль')
    .min(8, 'Пароль должен содержать минимум 8 символов'),
  confirmPassword: z.string().min(1, 'Подтвердите пароль'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Пароли не совпадают',
  path: ['confirmPassword'],
})

type RegisterFormData = z.infer<typeof registerSchema>

export function RegisterForm() {
  const navigate = useNavigate()
  const { login: storeLogin } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const mutation = useMutation({
    mutationFn: (data: Omit<RegisterFormData, 'confirmPassword'>) =>
      registerUser(data),
    onSuccess: (data) => {
      storeLogin(data.token, {
        id: data.userId,
        email: data.email,
        name: data.name,
      })
      toast.success('Добро пожаловать в FamilyLink!')
      navigate('/dashboard')
    },
    onError: (error: unknown) => {
      let message = 'Произошла ошибка. Попробуйте позже.'
      if (axios.isAxiosError(error)) {
        const apiErr = error.response?.data as ApiError | undefined
        if (error.response?.status === 409) {
          message = 'Пользователь с таким email уже зарегистрирован'
        } else if (apiErr?.message) {
          message = apiErr.message
        }
      }
      toast.error(message)
    },
  })

  const onSubmit = ({ confirmPassword: _confirm, ...data }: RegisterFormData) => {
    mutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Имя</Label>
        <Input
          id="name"
          type="text"
          placeholder="Ваше имя"
          autoComplete="name"
          aria-invalid={!!errors.name}
          {...register('name')}
        />
        {errors.name && (
          <p className="text-xs text-[var(--color-error)]">{errors.name.message}</p>
        )}
      </div>

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
          autoComplete="new-password"
          aria-invalid={!!errors.password}
          {...register('password')}
        />
        {errors.password && (
          <p className="text-xs text-[var(--color-error)]">{errors.password.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="confirmPassword">Повторите пароль</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Повторите пароль"
          autoComplete="new-password"
          aria-invalid={!!errors.confirmPassword}
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p className="text-xs text-[var(--color-error)]">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={mutation.isPending}
        className="mt-2 h-11 w-full rounded-xl bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-hover)] transition-colors"
      >
        {mutation.isPending ? 'Регистрируем...' : 'Зарегистрироваться'}
      </Button>
    </form>
  )
}
