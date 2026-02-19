import './SkeletonLoader.css'

interface SkeletonLoaderProps {
  type?: 'weather' | 'search'
}

function SkeletonLoader({ type = 'weather' }: SkeletonLoaderProps) {
  if (type === 'weather') {
    return (
      <div className="skeleton-weather">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton-main">
          <div className="skeleton skeleton-icon"></div>
          <div className="skeleton skeleton-temp"></div>
          <div className="skeleton skeleton-conditions"></div>
        </div>
        <div className="skeleton-details">
          <div className="skeleton skeleton-detail"></div>
          <div className="skeleton skeleton-detail"></div>
          <div className="skeleton skeleton-detail"></div>
          <div className="skeleton skeleton-detail"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="skeleton-search">
      <div className="skeleton skeleton-search-bar"></div>
    </div>
  )
}

export default SkeletonLoader
