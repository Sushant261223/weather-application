import { useState } from 'react'
import './App.css'
import LocationSearch from './components/LocationSearch'
import WeatherDisplay from './components/WeatherDisplay'
import HistoryView from './components/HistoryView'
import ErrorDisplay from './components/ErrorDisplay'

type View = 'current' | 'history'
type Unit = 'celsius' | 'fahrenheit'

function App() {
  const [selectedLocation, setSelectedLocation] = useState<string>('')
  const [currentView, setCurrentView] = useState<View>('current')
  const [unit, setUnit] = useState<Unit>('celsius')
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY

  if (!apiKey || apiKey === 'demo') {
    return (
      <div className="app">
        <header className="app-header">
          <h1>Weather Application</h1>
        </header>
        <main className="app-main">
          <ErrorDisplay
            error={{
              message: 'API key is missing. Please configure VITE_WEATHER_API_KEY in your environment.',
              code: 'MISSING_API_KEY',
              retryable: false,
            }}
          />
        </main>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Weather Application</h1>
        <div className="unit-toggle">
          <button
            className={unit === 'celsius' ? 'active' : ''}
            onClick={() => setUnit('celsius')}
          >
            °C
          </button>
          <button
            className={unit === 'fahrenheit' ? 'active' : ''}
            onClick={() => setUnit('fahrenheit')}
          >
            °F
          </button>
        </div>
      </header>
      <main className="app-main">
        <LocationSearch onLocationSelect={setSelectedLocation} />
        
        {selectedLocation && (
          <>
            <div className="view-tabs">
              <button
                className={currentView === 'current' ? 'tab active' : 'tab'}
                onClick={() => setCurrentView('current')}
              >
                Current Weather
              </button>
              <button
                className={currentView === 'history' ? 'tab active' : 'tab'}
                onClick={() => setCurrentView('history')}
              >
                History
              </button>
            </div>

            {currentView === 'current' && (
              <WeatherDisplay location={selectedLocation} />
            )}
            {currentView === 'history' && (
              <HistoryView location={selectedLocation} />
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default App
