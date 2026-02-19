import { useState, useEffect } from 'react'
import { weatherService } from '../services/WeatherService'
import { WeatherHistoryEntry, DateRange, AppError } from '../types/weather'
import { validateDateRange } from '../utils/validation'
import SkeletonLoader from './SkeletonLoader'
import ErrorDisplay from './ErrorDisplay'
import './HistoryView.css'

interface HistoryViewProps {
  location: string
}

function HistoryView({ location }: HistoryViewProps) {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  })
  const [history, setHistory] = useState<WeatherHistoryEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<AppError | null>(null)
  const [validationError, setValidationError] = useState<AppError | null>(null)

  const fetchHistory = async () => {
    const validation = validateDateRange(dateRange)
    if (validation) {
      setValidationError(validation)
      return
    }

    setValidationError(null)
    setLoading(true)
    setError(null)

    try {
      const data = await weatherService.getWeatherHistory(location, dateRange)
      setHistory(data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : 'Failed to fetch weather history',
        retryable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (location) {
      fetchHistory()
    }
  }, [location])

  if (loading) {
    return <SkeletonLoader type="weather" />
  }

  return (
    <div className="history-view">
      <h2>Weather History</h2>
      
      <div className="date-range-inputs">
        <div className="date-input-group">
          <label htmlFor="start-date">Start Date</label>
          <input
            id="start-date"
            type="date"
            value={dateRange.startDate}
            onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
            max={new Date().toISOString().split('T')[0]}
          />
        </div>
        
        <div className="date-input-group">
          <label htmlFor="end-date">End Date</label>
          <input
            id="end-date"
            type="date"
            value={dateRange.endDate}
            onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
            max={new Date().toISOString().split('T')[0]}
          />
        </div>
        
        <button onClick={fetchHistory} className="fetch-button">
          Fetch History
        </button>
      </div>

      {validationError && (
        <div className="validation-error">{validationError.message}</div>
      )}

      {error && <ErrorDisplay error={error} onRetry={fetchHistory} />}

      {!loading && !error && history.length === 0 && (
        <p className="empty-message">
          No historical data available. Note: Historical weather data requires a premium API plan.
        </p>
      )}

      {history.length > 0 && (
        <div className="history-list">
          {history.map((entry, index) => (
            <div key={index} className="history-entry">
              <div className="history-date">{new Date(entry.date).toLocaleDateString()}</div>
              <div className="history-details">
                <span>{entry.temperature}°C</span>
                <span>{entry.humidity}%</span>
                <span>{entry.windSpeed} m/s</span>
                <span className="history-conditions">{entry.conditions}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default HistoryView
