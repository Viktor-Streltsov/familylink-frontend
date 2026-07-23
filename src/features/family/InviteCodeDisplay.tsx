import { Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

interface InviteCodeDisplayProps {
  inviteCode: string
}

export function InviteCodeDisplay({ inviteCode }: InviteCodeDisplayProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode)
      setCopied(true)
      toast.success('Код скопирован!', {
        description: 'Отправьте его членам вашей семьи',
      })
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Не удалось скопировать код')
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl">
      {/* Тёмный терракотовый блок с кодом */}
      <div className="bg-[var(--color-brand)] px-6 py-5 text-center">
        <p className="mb-1 text-xs font-medium uppercase tracking-widest text-[#F5D0BF]">
          Код приглашения
        </p>
        <p
          className="text-3xl font-bold tracking-[0.25em] text-white"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          {inviteCode}
        </p>
      </div>

      {/* Кнопка копирования */}
      <div className="border border-t-0 border-[var(--color-border)] rounded-b-2xl bg-white px-4 py-3 flex items-center justify-between">
        <p className="text-xs text-[var(--color-text-muted)]">
          Поделитесь кодом с членами семьи
        </p>
        <Button
          onClick={handleCopy}
          variant="outline"
          size="sm"
          className="gap-1.5 rounded-xl border-[var(--color-border)] text-[var(--color-brand)] hover:border-[var(--color-brand)] hover:bg-[var(--color-brand-light)]"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Скопировано' : 'Скопировать'}
        </Button>
      </div>
    </div>
  )
}
