import { AppError, DateRange } from '../types/weather'

export function validateLocationInput(input: string): AppError | null {
  if (!input || input.trim().length === 0) {
    return {
      message: 'Please enter a location.',
      code: 'EMPTY_LOCATION',
      retryable: false,
    }
  }
  
  if (input.trim().length < 2) {
    return {
      message: 'Location must be at least 2 characters long.',
      code: 'LOCATION_TOO_SHORT',
      retryable: false,
    }
  }
  
  return null
}

export function validateDateRange(dateRange: DateRange): AppError | null {
  const startDate = new Date(dateRange.startDate)
  const endDate = new Date(dateRange.endDate)
  const now = new Date()
  
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return {
      message: 'Invalid date format.',
      code: 'INVALID_DATE',
      retryable: false,
    }
  }
  
  if (startDate > endDate) {
    return {
      message: 'Start date must be before end date.',
      code: 'INVALID_DATE_RANGE',
      retryable: false,
    }
  }
  
  if (startDate > now || endDate > now) {
    return {
      message: 'Cannot select future dates.',
      code: 'FUTURE_DATE',
      retryable: false,
    }
  }
  
  return null
}
