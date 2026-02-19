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

export interface WeatherHistoryEntry {
  date: string
  temperature: number
  humidity: number
  windSpeed: number
  conditions: string
}

export interface APIConfig {
  apiKey: string
  baseUrl?: string
}

export interface DateRange {
  startDate: string
  endDate: string
}

export interface AdditionalWeatherData {
  uvIndex?: number
  airQuality?: number
  precipitation?: number
}

export interface ForecastData {
  date: string
  temperature: number
  conditions: string
  icon?: string
}
