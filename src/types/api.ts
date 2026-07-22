/** Стандартная структура ошибки от API */
export interface ApiError {
  status: number
  error: string
  message: string
  details: string[] | null
  timestamp: string
}

/** Вспомогательный тип для axios error */
export interface ApiErrorResponse {
  data: ApiError
  status: number
}
