export interface Location {
  name: string
  country: string
  lat: number
  lon: number
}

export interface CurrentWeather {
  location: string
  temperature: number
  humidity: number
  windSpeed: number
  conditions: string
  icon?: string
  feelsLike?: number
  pressure?: number
  visibility?: number
}

export interface AppError {
  message: string
  code?: string
  retryable: boolean
}
