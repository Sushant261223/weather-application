import SkeletonLoader from './SkeletonLoader'
import './LoadingIndicator.css'

interface LoadingIndicatorProps {
  message?: string
  type?: 'spinner' | 'skeleton'
}

function LoadingIndicator({ message = 'Loading...', type = 'spinner' }: LoadingIndicatorProps) {
  if (type === 'skeleton') {
    return <SkeletonLoader type="weather" />
  }

  return (
    <div className="loading-indicator">
      <div className="spinner"></div>
      <p className="loading-message">{message}</p>
    </div>
  )
}

export default LoadingIndicator
