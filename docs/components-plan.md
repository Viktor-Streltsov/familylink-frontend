# FamilyLink Frontend — Components Plan

## Страницы (routes)

### Публичные
- `/` — Landing (welcome, переход на login/register)
- `/login` — LoginPage
- `/register` — RegisterPage

### Защищённые (внутри AppLayout с bottom-nav)
- `/dashboard` — DashboardPage (семьи + быстрая отметка настроения)
- `/families/new` — CreateFamilyPage
- `/families/join` — JoinFamilyPage
- `/families/:familyId` — FamilyDetailPage (участники + настроения + ситуации)
- `/families/:familyId/mood` — TrackMoodPage
- `/families/:familyId/situations/new` — CreateSituationPage
- `/situations/:situationId` — SituationDetailPage
- `/situations/:situationId/describe` — SubmitDescriptionPage
- `/situations/:situationId/recommendation` — RecommendationPage
- `/profile` — ProfilePage
- `/settings/consents` — ConsentsPage
- `/settings/data` — DataManagementPage (удалить всё)

## Layouts

- `AuthLayout` — центрированный логотип + карточка формы
- `AppLayout` — header с логотипом + main + bottom navigation (Home / Families / Profile)

## Shared компоненты (в `components/shared/`)

- `MoodEmoji` — эмодзи-кружок по типу настроения (props: `type: MoodType`, `size: 'sm'|'md'|'lg'`)
- `MoodPicker` — выбор настроения из 7 (кружки в ряд)
- `RoleBadge` — pill с ролью (props: `role: FamilyRole`)
- `SituationStatusBadge` — статус ситуации
- `SituationCategoryIcon` — иконка категории
- `UserAvatar` — аватар с fallback на инициалы (props: `name`, `avatarUrl`, `size`)
- `EmptyState` — заглушка «пока нет данных» с иконкой + текстом + CTA
- `LoadingSpinner` — терракотовый спиннер
- `ErrorMessage` — красивый вывод ошибки с иконкой
- `ConsentGuard` — обёртка: если нет согласия, показывает призыв дать
- `CrisisContacts` — карточка с телефонами КР (111, 112, Сезим), используется в safety-случаях
- `AiDisclaimer` — мелкий текст «это автоматически сгенерированные...»

## Feature-компоненты

### auth
- `LoginForm`
- `RegisterForm`
- `ProtectedRoute` (компонент-обёртка)

### family
- `FamilyCard` — превью семьи для списка
- `FamilyMemberList` — участники
- `InviteCodeDisplay` — крупное отображение кода + копирование

### mood
- `MoodEntryCard` — карточка одной записи
- `TodayMoodsList` — список настроений семьи за сегодня
- `MoodHistoryList` — история

### situation
- `SituationCard` — превью для списка
- `SituationParticipantCard` — участник со статусом (submitted/not)
- `DescriptionForm` — форма ввода описания
- `RecommendationCard` — блок с AI-советом
- `SituationsList` — список
- `CategoryPicker` — выбор категории при создании

### consent
- `ConsentCard` — карточка одного согласия с кнопками toggle/revoke
- `ConsentsList` — все мои согласия
- `ConsentRequestDialog` — модалка «дайте согласие» с длинным пояснительным текстом

## Хуки (в `hooks/`)

- `useAuth()` — из Zustand store
- `useCurrentUser()` — TanStack Query `/users/me`
- `useMyFamilies()`, `useFamilyMembers(id)`
- `useTodayMoods(familyId)`, `useMyMoodHistory(familyId)`
- `useMyConsents()`, `useHasConsent(type)`
- `useFamilySituations(familyId)`, `useSituation(id)`
- `useCreateMood()`, `useCreateSituation()`, `useSubmitDescription()` etc. — мутации

## API-функции (в `api/`)

Каждый файл содержит функции + типы TS.

- `client.ts` — axios instance, interceptor для token, interceptor для 401
- `authApi.ts` — register, login
- `userApi.ts` — getMe
- `familyApi.ts` — createFamily, joinFamily, getMyFamilies, getFamilyMembers
- `moodApi.ts` — createMood, getTodayMoods, getMyMoodHistory, deleteAllMoodData
- `situationApi.ts` — createSituation, getFamilySituations, getSituation, joinSituation, submitDescription, requestRecommendation
- `consentApi.ts` — grantConsent, revokeConsent, getMyConsents

## Zustand stores

- `authStore` — token, currentUser, actions (login, logout, setUser)

## Общие типы (в `types/`)

- `types/user.ts` — User, UserProfile
- `types/family.ts` — Family, FamilyMember, FamilyRole
- `types/mood.ts` — Mood, MoodType
- `types/situation.ts` — Situation, Participant, Recommendation, SituationCategory, SituationStatus
- `types/consent.ts` — Consent, ConsentType
- `types/api.ts` — ApiError

## Дизайн-примечания к отдельным экранам

- **DashboardPage** — hero-приветствие «Здравствуйте, {имя}» + мои семьи + быстрая кнопка «Как я сегодня?»
- **FamilyDetailPage** — три секции: участники (аватары в ряд), настроения сегодня, активные ситуации
- **SituationDetailPage** — таймлайн: кто описал, кто ещё нет, кнопка «получить совет» становится активной, когда условия выполнены
- **RecommendationPage** — большая карточка с советом, ниже — материалы, ещё ниже — контакты психологов
- **CrisisContacts** — красная (терракотовая) карточка с 111, 112, Сезим — крупно, ясно