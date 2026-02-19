import { useEffect, useState } from 'react'
import { weatherService } from '../services/WeatherService'
import { CurrentWeather } from '../types/weather'
import './WeatherDisplay.css'

interface WeatherDisplayProps {
  location: string
}

function WeatherDisplay({ location }: WeatherDisplayProps) {
  const [weather, setWeather] = useState<CurrentWeather | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await weatherService.getCurrentWeather(location)
        setWeather(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch weather')
      } finally {
        setLoading(false)
      }
    }

    if (location) {
      fetchWeather()
    }
  }, [location])

  if (loading) {
    return <div className="weather-display loading">Loading weather data...</div>
  }

  if (error) {
    return <div className="weather-display error">{error}</div>
  }

  if (!weather) {
    return null
  }

  return (
    <div className="weather-display">
      <h2 className="weather-location">{weather.location}</h2>
      
      <div className="weather-main">
        {weather.icon && (
          <img
            src={weather.icon}
            alt={weather.conditions}
            className="weather-icon"
          />
        )}
        <div className="weather-temp">{weather.temperature}°C</div>
        <div className="weather-conditions">{weather.conditions}</div>
      </div>

      <div className="weather-details">
        <div className="weather-detail">
          <span className="detail-label">Feels Like</span>
          <span className="detail-value">{weather.feelsLike}°C</span>
        </div>
        <div className="weather-detail">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{weather.humidity}%</span>
        </div>
        <div className="weather-detail">
          <span className="detail-label">Wind Speed</span>
          <span className="detail-value">{weather.windSpeed} m/s</span>
        </div>
        {weather.pressure && (
          <div className="weather-detail">
            <span className="detail-label">Pressure</span>
            <span className="detail-value">{weather.pressure} hPa</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default WeatherDisplay
