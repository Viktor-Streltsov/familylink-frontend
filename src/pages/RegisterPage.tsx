import { Link } from 'react-router-dom'
import { AuthLayout } from '@/components/layouts/AuthLayout'
import { RegisterForm } from '@/features/auth/RegisterForm'

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Создайте аккаунт"
      subtitle="Зарегистрируйтесь, чтобы начать"
    >
      <RegisterForm />

      <p className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
        Уже есть аккаунт?{' '}
        <Link
          to="/login"
          className="font-medium text-[var(--color-brand)] hover:text-[var(--color-brand-hover)] transition-colors"
        >
          Войдите
        </Link>
      </p>

      <p className="mt-4 text-center text-xs text-[var(--color-text-muted)]">
        Регистрируясь, вы соглашаетесь с обработкой персональных данных
        в соответствии с политикой конфиденциальности FamilyLink.
      </p>
    </AuthLayout>
  )
}
