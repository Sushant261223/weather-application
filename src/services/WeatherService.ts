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
      const response = await fetch(
        `${this.baseUrl}/weather?q=${encodeURIComponent(location)}&units=metric&appid=${this.apiKey}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch weather data')
      }

      const data = await response.json()
      
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
      throw new Error('Unable to fetch weather data. Please try again.')
    }
  }

  async getWeatherHistory(location: string, dateRange: DateRange): Promise<WeatherHistoryEntry[]> {
    // Note: OpenWeatherMap free tier doesn't support historical data
    // This is a placeholder implementation
    try {
      // In a real implementation, you would call a historical weather API
      console.warn('Historical weather data not available in free tier')
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
