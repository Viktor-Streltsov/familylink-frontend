import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'

/** Дата и время для карточек */
export function formatDateTime(iso: string): string {
  return format(parseISO(iso), 'd MMMM yyyy, HH:mm', { locale: ru })
}

/** Только дата */
export function formatDate(iso: string): string {
  return format(parseISO(iso), 'd MMMM yyyy', { locale: ru })
}

/** Время сегодня */
export function formatTime(iso: string): string {
  return format(parseISO(iso), 'HH:mm', { locale: ru })
}
