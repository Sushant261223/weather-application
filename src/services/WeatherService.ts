import { CurrentWeather, Location } from '../types/weather'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'demo'
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export class WeatherService {
  async searchLocations(query: string): Promise<Location[]> {
    if (!query.trim()) {
      return []
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
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
        `${BASE_URL}/weather?q=${encodeURIComponent(location)}&units=metric&appid=${API_KEY}`
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
}

export const weatherService = new WeatherService()
