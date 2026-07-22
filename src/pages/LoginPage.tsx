import { Link } from 'react-router-dom'
import { AuthLayout } from '@/components/layouts/AuthLayout'
import { LoginForm } from '@/features/auth/LoginForm'

export default function LoginPage() {
  return (
    <AuthLayout
      title="С возвращением"
      subtitle="Войдите в свой аккаунт FamilyLink"
    >
      <LoginForm />

      <p className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
        Ещё нет аккаунта?{' '}
        <Link
          to="/register"
          className="font-medium text-[var(--color-brand)] hover:text-[var(--color-brand-hover)] transition-colors"
        >
          Зарегистрируйтесь
        </Link>
      </p>
    </AuthLayout>
  )
}
