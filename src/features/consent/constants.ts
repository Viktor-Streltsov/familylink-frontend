import { ConsentType } from '@/types/consent'
import type { Consent } from '@/types/consent'

export const CONSENT_TYPE_ORDER: ConsentType[] = [
  ConsentType.MOOD_TRACKING,
  ConsentType.AI_ANALYSIS,
  ConsentType.DATA_SHARING_WITH_FAMILY,
]

export const CONSENT_TYPE_LABELS: Record<ConsentType, string> = {
  [ConsentType.MOOD_TRACKING]: 'Отметки настроения',
  [ConsentType.AI_ANALYSIS]: 'AI-анализ ситуаций',
  [ConsentType.DATA_SHARING_WITH_FAMILY]: 'Обмен данными с семьёй',
}

export const CONSENT_TYPE_DESCRIPTIONS: Record<ConsentType, string> = {
  [ConsentType.MOOD_TRACKING]: `Мы будем хранить ваши отметки настроения, чтобы вы могли отслеживать своё состояние и делиться им с близкими — если захотите.

Данные хранятся не дольше 6 месяцев. Вы можете в любой момент отозвать согласие или удалить все записи в разделе «Мои данные».`,

  [ConsentType.AI_ANALYSIS]: `Если вы согласны, мы передаём ваши описания ситуаций AI-помощнику, чтобы он мог предложить бережные рекомендации по общению в семье.

AI даёт рекомендацию, а не диагноз. Вы можете отозвать согласие в любой момент — тогда новые описания не будут анализироваться.`,

  [ConsentType.DATA_SHARING_WITH_FAMILY]: `Часть ваших данных (например, настроение, если вы включили «Показать семье») может быть видна другим участникам вашей семьи в приложении.

Вы контролируете, что именно показывать, при каждой отметке. Согласие можно отозвать в любой момент.`,
}

/** Последняя запись по типу согласия */
export function getLatestConsentForType(
  consents: Consent[] | undefined,
  type: ConsentType
): Consent | undefined {
  if (!consents?.length) return undefined
  return [...consents]
    .filter((c) => c.consentType === type)
    .sort(
      (a, b) =>
        new Date(b.grantedAt).getTime() - new Date(a.grantedAt).getTime()
    )[0]
}

/** Активно ли согласие данного типа */
export function isConsentActive(
  consents: Consent[] | undefined,
  type: ConsentType
): boolean {
  const latest = getLatestConsentForType(consents, type)
  return !!latest?.granted && latest.revokedAt === null
}
