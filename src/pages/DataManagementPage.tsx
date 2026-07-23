import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { ArrowLeft, AlertTriangle } from 'lucide-react'

import type { ApiError } from '@/types/api'
import { useDeleteAllMoodData } from '@/features/mood/hooks'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export default function DataManagementPage() {
  const navigate = useNavigate()
  const { mutate, isPending } = useDeleteAllMoodData()

  const handleDelete = () => {
    mutate(undefined, {
      onSuccess: (result) => {
        toast.success(`Удалено ${result.deletedCount} записей`)
      },
      onError: (error: unknown) => {
        let message = 'Не удалось удалить данные. Попробуйте позже.'
        if (axios.isAxiosError(error)) {
          const apiErr = error.response?.data as ApiError | undefined
          if (apiErr?.message) message = apiErr.message
        }
        toast.error(message)
      },
    })
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <header className="flex items-center gap-3 border-b border-[var(--color-border)] bg-white px-4 py-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-8 w-8 items-center justify-center rounded-xl text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-warm)]"
          aria-label="Назад"
        >
          <ArrowLeft size={20} />
        </button>
        <h1
          className="text-lg font-bold text-[var(--color-text-primary)]"
          style={{ fontFamily: 'Fraunces, serif' }}
        >
          Мои данные
        </h1>
      </header>

      <main className="px-4 pt-5 pb-8">
        <div className="rounded-2xl border border-[var(--color-error)]/30 bg-[#FDE8E8] p-5">
          <div className="mb-3 flex items-center gap-2 text-[var(--color-error)]">
            <AlertTriangle size={22} />
            <h2
              className="text-base font-bold"
              style={{ fontFamily: 'Fraunces, serif' }}
            >
              Удаление эмоциональных данных
            </h2>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Это действие безвозвратно удалит все ваши записи о настроении во
            всех семьях. Согласия останутся — при желании их можно отозвать
            отдельно.
          </p>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="destructive"
                className="mt-5 h-11 w-full rounded-xl bg-[var(--color-error)] text-white hover:bg-[var(--color-error)]/90"
                disabled={isPending}
              >
                Удалить все мои эмоциональные данные
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-2xl border-[var(--color-border)] bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle
                  className="text-[var(--color-text-primary)]"
                  style={{ fontFamily: 'Fraunces, serif' }}
                >
                  Удалить все записи о настроении?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-left text-[var(--color-text-secondary)]">
                  Мы удалим каждую вашу отметку настроения. Восстановить их
                  будет нельзя. Вы уверены?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="h-10 rounded-xl">
                  Отмена
                </AlertDialogCancel>
                <AlertDialogAction
                  className="h-10 rounded-xl bg-[var(--color-error)] text-white hover:bg-[var(--color-error)]/90"
                  onClick={handleDelete}
                  disabled={isPending}
                >
                  {isPending ? 'Удаляем...' : 'Да, удалить'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </main>
    </div>
  )
}
