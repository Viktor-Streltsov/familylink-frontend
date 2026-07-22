# FamilyLink Backend API

**Base URL:** `http://localhost:8080` (dev) — вынести в `.env` как `VITE_API_URL`
**Auth:** JWT в заголовке `Authorization: Bearer <token>`

## Общие правила

- Успешные ответы: 200 (OK), 201 (Created), 204 (No Content)
- Тело ошибок всегда:
```json
{
  "status": 400,
  "error": "Bad Request",
  "message": "Человекочитаемое сообщение",
  "details": ["email: некорректный формат"] | null,
  "timestamp": "2026-07-21T..."
}
```

## Auth

### POST /api/auth/register
Регистрация нового пользователя.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "min8chars",
  "name": "Имя Фамилия"
}
```

**Response 201:**
```json
{
  "token": "eyJhbG...",
  "tokenType": "Bearer",
  "expiresInMs": 86400000,
  "userId": "uuid",
  "email": "user@example.com",
  "name": "Имя Фамилия"
}
```

**Возможные ошибки:**
- 400 — валидация (пароль < 8 символов, некорректный email)
- 409 — «Пользователь с таким email уже зарегистрирован»

### POST /api/auth/login
Вход.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "..."
}
```

**Response 200:** такое же тело, как в register.

**Возможные ошибки:**
- 401 — «Неверный email или пароль»

## Users

### GET /api/users/me
Данные текущего пользователя.

**Response 200:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "Имя",
  "avatarUrl": null,
  "createdAt": "2026-07-21T..."
}
```

## Consents

Тип согласия — enum: `MOOD_TRACKING` | `AI_ANALYSIS` | `DATA_SHARING_WITH_FAMILY`

### POST /api/consents
Дать согласие.

**Request:**
```json
{
  "consentType": "MOOD_TRACKING",
  "granted": true
}
```

**Response 201:**
```json
{
  "id": "uuid",
  "consentType": "MOOD_TRACKING",
  "granted": true,
  "grantedAt": "2026-07-21T...",
  "revokedAt": null,
  "consentVersion": "v1.0"
}
```

### DELETE /api/consents/{type}
Отозвать согласие. `type` — один из ConsentType значений.

**Response 204** без тела.

### GET /api/consents/my
История моих согласий.

**Response 200:** массив ConsentResponse.

## Families

Роль в семье — enum: `PARENT` | `CHILD` | `GUARDIAN` | `OTHER`

### POST /api/families
Создать семью.

**Request:**
```json
{
  "name": "Семья Абдырашевых",
  "creatorRole": "PARENT"
}
```

**Response 201:**
```json
{
  "id": "uuid",
  "name": "Семья Абдырашевых",
  "inviteCode": "FAM-A7X2K9",
  "createdBy": "uuid",
  "membersCount": 1,
  "createdAt": "..."
}
```

### POST /api/families/join
Вступить по коду.

**Request:**
```json
{
  "inviteCode": "FAM-A7X2K9",
  "role": "CHILD"
}
```

**Response 200:** такое же тело FamilyResponse.

**Возможные ошибки:**
- 404 — семья не найдена
- 409 — «Вы уже состоите в этой семье»

### GET /api/families/my
Мои семьи.

**Response 200:** массив FamilyResponse.

### GET /api/families/{familyId}/members
Участники семьи.

**Response 200:** массив FamilyMemberResponse:
```json
[
  {
    "memberId": "uuid",
    "userId": "uuid",
    "userName": "Айгуль",
    "userEmail": "...",
    "avatarUrl": null,
    "role": "PARENT",
    "joinedAt": "..."
  }
]
```

**Возможные ошибки:**
- 403 — «Вы не являетесь участником этой семьи»

## Mood

Тип настроения — enum: `GREAT` | `GOOD` | `NEUTRAL` | `TIRED` | `SAD` | `ANGRY` | `ANXIOUS`

### POST /api/families/{familyId}/mood
Отметить настроение.

**Request:**
```json
{
  "moodType": "TIRED",
  "note": "Тяжёлый день",
  "visibleToFamily": true
}
```

**Response 201:** MoodResponse:
```json
{
  "id": "uuid",
  "userId": "uuid",
  "userName": "Айгуль",
  "userAvatar": null,
  "moodType": "TIRED",
  "note": "Тяжёлый день",
  "visibleToFamily": true,
  "createdAt": "..."
}
```

**Возможные ошибки:**
- 403 «Consent Required» — нет согласия `MOOD_TRACKING`

### GET /api/families/{familyId}/mood/today
Настроения всех членов семьи за сегодня.

**Response 200:** массив MoodResponse.

### GET /api/families/{familyId}/mood/my
Моя история в этой семье.

**Response 200:** массив MoodResponse.

### DELETE /api/mood/my/all
Удалить все свои эмоциональные данные (right to be forgotten).

**Response 200:**
```json
{
  "deletedCount": 5,
  "message": "Все ваши записи о настроении удалены"
}
```

## Situations

Категории: `STUDY` | `DAILY_ROUTINE` | `GADGETS` | `EMOTIONS` | `CONFLICTS` | `FRIENDS` | `HEALTH` | `OTHER`
Статусы: `OPEN` | `IN_DISCUSSION` | `RESOLVED` | `CLOSED`

### POST /api/families/{familyId}/situations
Создать ситуацию.

**Request:**
```json
{
  "title": "Не хочет учиться",
  "category": "STUDY"
}
```

**Response 201:** SituationResponse.

### GET /api/families/{familyId}/situations
Список ситуаций в семье.

**Response 200:** массив SituationResponse.

### GET /api/situations/{situationId}
Детали ситуации.

**Response 200:**
```json
{
  "id": "uuid",
  "familyId": "uuid",
  "createdBy": "uuid",
  "createdByName": "Айгуль",
  "title": "...",
  "category": "STUDY",
  "status": "IN_DISCUSSION",
  "sensitive": false,
  "participantsCount": 2,
  "submittedDescriptionsCount": 2,
  "hasRecommendation": true,
  "createdAt": "...",
  "resolvedAt": null,
  "participants": [
    {
      "id": "uuid",
      "userId": "uuid",
      "userName": "Айгуль",
      "description": "Мой ребёнок...",  // может быть null, если чужое ещё не submit-нуто
      "consentedToAi": true,
      "hasSubmitted": true,
      "submittedAt": "..."
    }
  ]
}
```

### POST /api/situations/{situationId}/join
Присоединиться к ситуации как участник.

**Response 200:** SituationResponse.

### POST /api/situations/{situationId}/description
Добавить своё описание.

**Request:**
```json
{
  "description": "Мой сын не хочет учиться...",
  "consentToAiAnalysis": true
}
```

**Response 200:** SituationResponse.

**Возможные ошибки:**
- 403 «Consent Required» — нет `AI_ANALYSIS` (если `consentToAiAnalysis: true`)

### POST /api/situations/{situationId}/recommendation
Запросить AI-совет.

**Response 200:** RecommendationResponse:
```json
{
  "id": "uuid",
  "status": "GENERATED",  // или BLOCKED_SENSITIVE, PENDING, FAILED
  "content": "Учёба часто...",
  "resources": "Полезные материалы:...",
  "modelVersion": "mock-v1",
  "safetyFlag": false,
  "generatedAt": "..."
}
```

**Возможные ошибки:**
- 409 — «Нужно минимум 2 участника с описаниями и согласием»
- 409 — «Разговор одного человека с самим собой невозможен»
- 409 — «Нужны участники с разными ролями в семье»

**⚠️ Важно:** если `safetyFlag: true` — показывать `content` с кризисными контактами КРУПНО, `resources` содержит телефоны 111, 112.