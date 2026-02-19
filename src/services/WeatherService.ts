import { CurrentWeather, Location, APIConfig, WeatherHistoryEntry, DateRange, AdditionalWeatherData } from '../types/weather'

const DEFAULT_BASE_URL = 'https://api.weatherstack.com'

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
      // Weatherstack doesn't have a separate search endpoint
      // We'll return a single result based on the query
      const response = await fetch(
        `${this.baseUrl}/current?access_key=${this.apiKey}&query=${encodeURIComponent(query)}`
      )
      
      if (!response.ok) {
        throw new Error('Failed to search locations')
      }

      const data = await response.json()
      
      if (data.error) {
        console.error('Location search error:', data.error)
        return []
      }

      if (data.location) {
        return [{
          name: data.location.name,
          country: data.location.country,
          lat: parseFloat(data.location.lat),
          lon: parseFloat(data.location.lon),
        }]
      }
      
      return []
    } catch (error) {
      console.error('Location search error:', error)
      return []
    }
  }

  async getCurrentWeather(location: string): Promise<CurrentWeather> {
    try {
      const url = `${this.baseUrl}/current?access_key=${this.apiKey}&query=${encodeURIComponent(location)}&units=m`
      console.log('Fetching weather from:', url.replace(this.apiKey, 'API_KEY'))
      
      const response = await fetch(url)

      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Weatherstack free tier allows 1,000 requests/month. Please wait or upgrade your plan.')
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Weather API response:', data)
      
      if (data.error) {
        console.error('API Error:', data.error)
        if (data.error.code === 104) {
          throw new Error('Monthly API request limit reached. Weatherstack free tier: 1,000 requests/month.')
        }
        throw new Error(data.error.info || 'Failed to fetch weather data')
      }
      
      if (!data.current || !data.location) {
        throw new Error('Invalid response from weather API')
      }
      
      return {
        location: data.location.name,
        temperature: data.current.temperature,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_speed,
        conditions: data.current.weather_descriptions[0],
        icon: data.current.weather_icons[0],
        feelsLike: data.current.feelslike,
        pressure: data.current.pressure,
        visibility: data.current.visibility,
      }
    } catch (error) {
      console.error('Weather fetch error:', error)
      throw new Error(error instanceof Error ? error.message : 'Unable to fetch weather data. Please try again.')
    }
  }

  async getWeatherHistory(location: string, dateRange: DateRange): Promise<WeatherHistoryEntry[]> {
    // Note: Weatherstack historical data requires premium plan
    // This is a placeholder implementation
    try {
      console.warn('Historical weather data requires premium plan')
      // Suppress unused parameter warnings
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
        `${this.baseUrl}/current?access_key=${this.apiKey}&query=${encodeURIComponent(location)}&units=m`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch additional weather data')
      }

      const data = await response.json()
      
      if (data.error) {
        return {}
      }
      
      return {
        uvIndex: data.current.uv_index,
        precipitation: data.current.precip,
      }
    } catch (error) {
      console.error('Additional features error:', error)
      return {}
    }
  }
}

export const weatherService = new WeatherService()
