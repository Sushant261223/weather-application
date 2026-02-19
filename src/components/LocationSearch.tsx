import { useState } from 'react'
import { weatherService } from '../services/WeatherService'
import { Location } from '../types/weather'
import './LocationSearch.css'

interface LocationSearchProps {
  onLocationSelect: (location: string) => void
}

function LocationSearch({ onLocationSelect }: LocationSearchProps) {
  const [query, setQuery] = useState('')
  const [locations, setLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) return

    setLoading(true)
    try {
      const results = await weatherService.searchLocations(query)
      setLocations(results)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = (location: Location) => {
    onLocationSelect(location.name)
    setQuery('')
    setLocations([])
  }

  return (
    <div className="location-search">
      <div className="search-input-group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Enter city name..."
          className="search-input"
        />
        <button onClick={handleSearch} disabled={loading} className="search-button">
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {locations.length > 0 && (
        <ul className="location-results">
          {locations.map((loc, index) => (
            <li key={index} onClick={() => handleSelect(loc)} className="location-item">
              {loc.name}, {loc.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default LocationSearch
