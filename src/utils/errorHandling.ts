import { AppError } from '../types/weather'

export function handleNetworkError(): AppError {
  return {
    message: 'Network error. Please check your internet connection and try again.',
    code: 'NETWORK_ERROR',
    retryable: true,
  }
}

export function handleAPIError(statusCode: number): AppError {
  if (statusCode === 401 || statusCode === 403) {
    return handleAuthError()
  }
  
  if (statusCode === 429) {
    return handleRateLimitError()
  }
  
  if (statusCode >= 400 && statusCode < 500) {
    return {
      message: 'Invalid request. Please check your input and try again.',
      code: `API_ERROR_${statusCode}`,
      retryable: false,
    }
  }
  
  if (statusCode >= 500) {
    return {
      message: 'Server error. Please try again later.',
      code: `SERVER_ERROR_${statusCode}`,
      retryable: true,
    }
  }
  
  return {
    message: 'An unexpected error occurred. Please try again.',
    code: `UNKNOWN_ERROR_${statusCode}`,
    retryable: true,
  }
}

export function handleRateLimitError(): AppError {
  return {
    message: 'Too many requests. Please wait a moment and try again.',
    code: 'RATE_LIMIT_ERROR',
    retryable: true,
  }
}

export function handleAuthError(): AppError {
  return {
    message: 'Authentication failed. Please check your API key.',
    code: 'AUTH_ERROR',
    retryable: false,
  }
}
