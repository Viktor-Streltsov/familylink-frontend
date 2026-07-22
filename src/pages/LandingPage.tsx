import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)]">
      {/* Хедер */}
      <header className="flex items-center justify-between px-6 pt-6">
        <span
          className="text-2xl font-bold text-[var(--color-brand)]"
          style={{ fontFamily: 'Fraunces, serif' }}
        >
          FamilyLink
        </span>
        <Link to="/login">
          <Button
            variant="outline"
            className="rounded-xl border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
          >
            Войти
          </Button>
        </Link>
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        {/* Иконка */}
        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-brand-light)]">
          <Heart size={36} className="text-[var(--color-brand)]" fill="currentColor" />
        </div>

        {/* Заголовок */}
        <h1
          className="mb-4 max-w-sm text-4xl font-bold leading-tight text-[var(--color-text-primary)]"
          style={{ fontFamily: 'Fraunces, serif' }}
        >
          Семья, которая понимает друг друга
        </h1>

        {/* Подзаголовок */}
        <p className="mb-10 max-w-sm text-base text-[var(--color-text-secondary)] leading-relaxed">
          FamilyLink помогает родителям и детям лучше понимать эмоции и находить
          общий язык — с поддержкой AI-помощника.
        </p>

        {/* CTA кнопки */}
        <div className="flex w-full max-w-xs flex-col gap-3">
          <Link to="/register" className="w-full">
            <Button className="h-12 w-full rounded-xl bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-hover)] text-base">
              Начать бесплатно
            </Button>
          </Link>
          <Link to="/login" className="w-full">
            <Button
              variant="outline"
              className="h-12 w-full rounded-xl border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] text-base"
            >
              Войти в аккаунт
            </Button>
          </Link>
        </div>

        {/* Дополнительный блок */}
        <div className="mt-16 grid grid-cols-3 gap-6 text-center max-w-sm">
          {[
            { emoji: '💬', text: 'Общайтесь\nоткрыто' },
            { emoji: '🤝', text: 'Понимайте\nдруг друга' },
            { emoji: '✨', text: 'Растите\nвместе' },
          ].map(({ emoji, text }) => (
            <div key={emoji} className="flex flex-col items-center gap-2">
              <span className="text-3xl">{emoji}</span>
              <p className="text-xs text-[var(--color-text-muted)] whitespace-pre-line leading-tight">
                {text}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Футер */}
      <footer className="px-6 pb-8 text-center">
        <p className="text-xs text-[var(--color-text-muted)]">
          © {new Date().getFullYear()} FamilyLink · Кыргызская Республика
        </p>
      </footer>
    </div>
  )
}
