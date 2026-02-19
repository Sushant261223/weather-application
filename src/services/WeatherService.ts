import { CurrentWeather, Location, APIConfig, WeatherHistoryEntry, DateRange, AdditionalWeatherData } from '../types/weather'

const DEFAULT_BASE_URL = 'https://api.openweathermap.org/data/2.5'

export class WeatherService {
  private apiKey: string
  private baseUrl: string

  constructor(config?: APIConfig) {
    this.apiKey = config?.apiKey || import.meta.env.VITE_WEATHER_API_KEY || 'demo'
    this.baseUrl = config?.baseUrl || DEFAULT_BASE_URL
  }

  async searchLocations(query: string): Promise<Location[]> {
    if (!query.trim()) {
      return []
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${this.apiKey}`
      )
      
      if (!response.ok) {
        throw new Error('Failed to search locations')
      }

      const data = await response.json()
      return data.map((item: any) => ({
        name: item.name,
        country: item.country,
        lat: item.lat,
        lon: item.lon,
      }))
    } catch (error) {
      console.error('Location search error:', error)
      return []
    }
  }

  async getCurrentWeather(location: string): Promise<CurrentWeather> {
    try {
      const url = `${this.baseUrl}/weather?q=${encodeURIComponent(location)}&units=metric&appid=${this.apiKey}`
      console.log('Fetching weather from:', url.replace(this.apiKey, 'API_KEY'))
      
      const response = await fetch(url)

      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please wait a moment and try again.')
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Weather API response:', data)
      
      return {
        location: data.name,
        temperature: Math.round(data.main.temp),
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        conditions: data.weather[0].description,
        icon: data.weather[0].icon,
        feelsLike: Math.round(data.main.feels_like),
        pressure: data.main.pressure,
        visibility: data.visibility,
      }
    } catch (error) {
      console.error('Weather fetch error:', error)
      throw new Error(error instanceof Error ? error.message : 'Unable to fetch weather data. Please try again.')
    }
  }

  async getWeatherHistory(location: string, dateRange: DateRange): Promise<WeatherHistoryEntry[]> {
    // Note: OpenWeatherMap historical data requires paid plan
    // This is a placeholder implementation
    try {
      console.warn('Historical weather data requires paid plan')
      void location
      void dateRange
      return []
    } catch (error) {
      throw new Error('Unable to fetch weather history.')
    }
  }

  async getAdditionalFeatures(location: string): Promise<AdditionalWeatherData> {
    try {
      const response = await fetch(
        `${this.baseUrl}/weather?q=${encodeURIComponent(location)}&units=metric&appid=${this.apiKey}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch additional weather data')
      }

      const data = await response.json()
      
      return {
        uvIndex: data.uvi,
        precipitation: data.rain?.['1h'] || data.snow?.['1h'],
      }
    } catch (error) {
      console.error('Additional features error:', error)
      return {}
    }
  }
}

export const weatherService = new WeatherService()
