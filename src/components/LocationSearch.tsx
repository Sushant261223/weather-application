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
    if (!query.trim()) {
      console.log('Empty query, skipping search')
      return
    }

    console.log('Searching for:', query)
    setLoading(true)
    try {
      const results = await weatherService.searchLocations(query)
      console.log('Search results:', results)
      setLocations(results)
      
      // If only one result, auto-select it
      if (results.length === 1) {
        handleSelect(results[0])
      }
    } catch (error) {
      console.error('Search failed:', error)
      alert('Search failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = (location: Location) => {
    console.log('Selected location:', location.name)
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
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch()
            }
          }}
          placeholder="Enter city name (e.g., London, New York)..."
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
      
      {!loading && locations.length === 0 && query.trim() && (
        <div className="no-results">
          No locations found. Try a different search term.
        </div>
      )}
    </div>
  )
}

export default LocationSearch
