import { useState } from 'react'
import type { ReactNode } from 'react'
import { Shield } from 'lucide-react'

import type { ConsentType } from '@/types/consent'
import { useMyConsents } from '@/features/consent/hooks'
import {
  CONSENT_TYPE_LABELS,
  isConsentActive,
} from '@/features/consent/constants'
import { ConsentRequestDialog } from '@/features/consent/ConsentRequestDialog'
import { Button } from '@/components/ui/button'

interface ConsentGuardProps {
  consentType: ConsentType
  children: ReactNode
}

export function ConsentGuard({ consentType, children }: ConsentGuardProps) {
  const { data: consents, isLoading } = useMyConsents()
  const hasConsent = isConsentActive(consents, consentType)
  const [dialogOpen, setDialogOpen] = useState(false)

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center px-6">
        <p className="text-sm text-[var(--color-text-muted)]">Загружаем...</p>
      </div>
    )
  }

  if (hasConsent) {
    return <>{children}</>
  }

  const label = CONSENT_TYPE_LABELS[consentType]

  return (
    <>
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-6 py-12 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-surface-warm)]">
          <Shield className="text-[var(--color-brand)]" size={28} />
        </div>
        <p className="text-base text-[var(--color-text-primary)]">
          Для этой функции нужно согласие:{' '}
          <span className="font-semibold">{label}</span>
        </p>
        <p className="text-sm text-[var(--color-text-muted)]">
          Мы бережно относимся к вашим данным. Вы можете отозвать согласие в
          любой момент в профиле.
        </p>
        <Button
          type="button"
          onClick={() => setDialogOpen(true)}
          className="mt-2 h-11 rounded-xl bg-[var(--color-brand)] px-6 text-white hover:bg-[var(--color-brand-hover)]"
        >
          Дать согласие
        </Button>
      </div>

      <ConsentRequestDialog
        consentType={consentType}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  )
}
