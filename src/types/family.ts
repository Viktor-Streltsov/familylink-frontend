export type FamilyRole = 'PARENT' | 'CHILD' | 'GUARDIAN' | 'OTHER'

/** Человекочитаемые русские названия ролей */
export const FAMILY_ROLE_LABELS: Record<FamilyRole, string> = {
  PARENT:   'Родитель',
  CHILD:    'Ребёнок',
  GUARDIAN: 'Опекун',
  OTHER:    'Другое',
}

/** Ответ API — семья */
export interface Family {
  id: string
  name: string
  inviteCode: string
  createdBy: string
  membersCount: number
  createdAt: string
}

/** Ответ API — участник семьи */
export interface FamilyMember {
  memberId: string
  userId: string
  userName: string
  userEmail: string
  avatarUrl: string | null
  role: FamilyRole
  joinedAt: string
}
