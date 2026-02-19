import './LoadingIndicator.css'

interface LoadingIndicatorProps {
  message?: string
}

function LoadingIndicator({ message = 'Loading...' }: LoadingIndicatorProps) {
  return (
    <div className="loading-indicator">
      <div className="spinner"></div>
      <p className="loading-message">{message}</p>
    </div>
  )
}

export default LoadingIndicator
