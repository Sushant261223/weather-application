import { AppError } from '../types/weather'
import './ErrorDisplay.css'

interface ErrorDisplayProps {
  error: AppError
  onRetry?: () => void
  onDismiss?: () => void
}

function ErrorDisplay({ error, onRetry, onDismiss }: ErrorDisplayProps) {
  return (
    <div className="error-display">
      <div className="error-icon">⚠️</div>
      <p className="error-message">{error.message}</p>
      <div className="error-actions">
        {error.retryable && onRetry && (
          <button onClick={onRetry} className="error-button retry-button">
            Retry
          </button>
        )}
        {onDismiss && (
          <button onClick={onDismiss} className="error-button dismiss-button">
            Dismiss
          </button>
        )}
      </div>
    </div>
  )
}

export default ErrorDisplay
