import { useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'

import type { ConsentType } from '@/types/consent'
import {
  CONSENT_TYPE_LABELS,
  getLatestConsentForType,
  isConsentActive,
} from '@/features/consent/constants'
import {
  useMyConsents,
  useRevokeConsent,
} from '@/features/consent/hooks'
import type { ApiError } from '@/types/api'
import { formatDateTime } from '@/lib/formatDate'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent } from '@/components/ui/card'
import { ConsentRequestDialog } from './ConsentRequestDialog'

interface ConsentCardProps {
  consentType: ConsentType
}

export function ConsentCard({ consentType }: ConsentCardProps) {
  const { data: consents } = useMyConsents()
  const { mutate: revoke, isPending: revoking } = useRevokeConsent()
  const [dialogOpen, setDialogOpen] = useState(false)

  const latest = getLatestConsentForType(consents, consentType)
  const active = isConsentActive(consents, consentType)
  const busy = revoking

  const handleToggle = (checked: boolean) => {
    if (checked) {
      setDialogOpen(true)
      return
    }
    revoke(consentType, {
      onSuccess: () => toast.success('Согласие отозвано'),
      onError: (error: unknown) => {
        toast.error(getErrorMessage(error))
      },
    })
  }

  return (
    <>
      <Card className="rounded-2xl border-[var(--color-border)] bg-white shadow-sm">
        <CardContent className="flex items-start gap-4 pt-4">
          <div className="min-w-0 flex-1">
            <h3
              className="text-base font-bold text-[var(--color-text-primary)]"
              style={{ fontFamily: 'Fraunces, serif' }}
            >
              {CONSENT_TYPE_LABELS[consentType]}
            </h3>
            <p className="mt-1 text-sm">
              {active ? (
                <span className="text-[var(--color-success)]">Активно</span>
              ) : (
                <span className="text-[var(--color-text-muted)]">Отозвано</span>
              )}
            </p>
            {latest && (
              <p className="mt-2 text-xs text-[var(--color-text-muted)]">
                {active && latest.grantedAt && (
                  <>Дано: {formatDateTime(latest.grantedAt)}</>
                )}
                {!active && latest.revokedAt && (
                  <>Отозвано: {formatDateTime(latest.revokedAt)}</>
                )}
              </p>
            )}
            {!latest && (
              <p className="mt-2 text-xs text-[var(--color-text-muted)]">
                Согласие ещё не давалось
              </p>
            )}
          </div>
          <Switch
            checked={active}
            onCheckedChange={handleToggle}
            disabled={busy}
            aria-label={`Согласие ${CONSENT_TYPE_LABELS[consentType]}`}
          />
        </CardContent>
      </Card>

      <ConsentRequestDialog
        consentType={consentType}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  )
}

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const apiErr = error.response?.data as ApiError | undefined
    if (apiErr?.message) return apiErr.message
  }
  return 'Не удалось выполнить действие. Попробуйте позже.'
}
