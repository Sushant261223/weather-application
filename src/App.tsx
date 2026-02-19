import { useState } from 'react'
import './App.css'
import LocationSearch from './components/LocationSearch'
import WeatherDisplay from './components/WeatherDisplay'

function App() {
  const [selectedLocation, setSelectedLocation] = useState<string>('')

  return (
    <div className="app">
      <header className="app-header">
        <h1>Weather Application</h1>
      </header>
      <main className="app-main">
        <LocationSearch onLocationSelect={setSelectedLocation} />
        {selectedLocation && <WeatherDisplay location={selectedLocation} />}
      </main>
    </div>
  )
}

export default App
