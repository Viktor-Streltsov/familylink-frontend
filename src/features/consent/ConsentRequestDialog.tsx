import axios from 'axios'
import { toast } from 'sonner'

import type { ConsentType } from '@/types/consent'
import {
  CONSENT_TYPE_LABELS,
  CONSENT_TYPE_DESCRIPTIONS,
} from '@/features/consent/constants'
import { useGrantConsent } from '@/features/consent/hooks'
import type { ApiError } from '@/types/api'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface ConsentRequestDialogProps {
  consentType: ConsentType
  open: boolean
  onOpenChange: (open: boolean) => void
  onGranted?: () => void
}

export function ConsentRequestDialog({
  consentType,
  open,
  onOpenChange,
  onGranted,
}: ConsentRequestDialogProps) {
  const { mutate, isPending } = useGrantConsent()

  const handleGrant = () => {
    mutate(consentType, {
      onSuccess: () => {
        toast.success('Спасибо, согласие сохранено')
        onOpenChange(false)
        onGranted?.()
      },
      onError: (error: unknown) => {
        let message = 'Не удалось сохранить согласие. Попробуйте позже.'
        if (axios.isAxiosError(error)) {
          const apiErr = error.response?.data as ApiError | undefined
          if (apiErr?.message) message = apiErr.message
        }
        toast.error(message)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="max-w-md rounded-2xl border-[var(--color-border)] bg-white sm:max-w-md"
      >
        <DialogHeader>
          <DialogTitle
            className="text-lg text-[var(--color-text-primary)]"
            style={{ fontFamily: 'Fraunces, serif' }}
          >
            {CONSENT_TYPE_LABELS[consentType]}
          </DialogTitle>
          <DialogDescription className="whitespace-pre-line text-left text-[var(--color-text-secondary)]">
            {CONSENT_TYPE_DESCRIPTIONS[consentType]}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="border-0 bg-transparent sm:justify-stretch">
          <Button
            type="button"
            variant="outline"
            className="h-11 flex-1 rounded-xl border-[var(--color-border)]"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Отмена
          </Button>
          <Button
            type="button"
            className="h-11 flex-1 rounded-xl bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-hover)]"
            onClick={handleGrant}
            disabled={isPending}
          >
            {isPending ? 'Сохраняем...' : 'Согласен'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
