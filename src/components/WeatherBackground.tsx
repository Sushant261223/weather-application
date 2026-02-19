import { useEffect, useState } from 'react'
import './WeatherBackground.css'

interface WeatherBackgroundProps {
  condition: string
}

function WeatherBackground({ condition }: WeatherBackgroundProps) {
  const [weatherType, setWeatherType] = useState<string>('clear')

  useEffect(() => {
    const lowerCondition = condition.toLowerCase()
    
    if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) {
      setWeatherType('rain')
    } else if (lowerCondition.includes('snow')) {
      setWeatherType('snow')
    } else if (lowerCondition.includes('cloud')) {
      setWeatherType('cloudy')
    } else if (lowerCondition.includes('clear') || lowerCondition.includes('sun')) {
      setWeatherType('clear')
    } else if (lowerCondition.includes('thunder') || lowerCondition.includes('storm')) {
      setWeatherType('thunder')
    } else {
      setWeatherType('clear')
    }
  }, [condition])

  return (
    <div className={`weather-background ${weatherType}`}>
      {weatherType === 'rain' && (
        <div className="rain">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="raindrop" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${0.5 + Math.random() * 0.5}s`
            }}></div>
          ))}
        </div>
      )}
      
      {weatherType === 'snow' && (
        <div className="snow">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="snowflake" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              fontSize: `${10 + Math.random() * 10}px`
            }}>❄</div>
          ))}
        </div>
      )}
      
      {weatherType === 'thunder' && (
        <div className="thunder">
          <div className="lightning"></div>
        </div>
      )}
    </div>
  )
}

export default WeatherBackground
