import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle?: string
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-background)] px-4 py-12">
      {/* Логотип */}
      <Link
        to="/"
        className="mb-8 flex flex-col items-center gap-1 no-underline"
      >
        <span
          className="font-heading text-3xl font-bold text-[var(--color-brand)] tracking-tight"
          style={{ fontFamily: 'Fraunces, serif' }}
        >
          FamilyLink
        </span>
        <span className="text-xs text-[var(--color-text-muted)]">Семья, которая понимает</span>
      </Link>

      {/* Карточка */}
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md border border-[var(--color-border)]">
        <div className="mb-6">
          <h1
            className="text-2xl font-bold text-[var(--color-text-primary)]"
            style={{ fontFamily: 'Fraunces, serif' }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">{subtitle}</p>
          )}
        </div>

        {children}
      </div>
    </div>
  )
}
