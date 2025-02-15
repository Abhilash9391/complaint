export default function SkeletonLoader() {
    return (
      <div role="status" className="skeleton-container">
        {Array.from({ length: 10}).map((_, index) => (
          <div className="skeleton-item" key={index}>
            <div className="skeleton-text">
              <div className="skeleton-line w-24"></div>
              <div className="skeleton-line w-32 small"></div>
            </div>
            <div className="skeleton-circle w-12"></div>
          </div>
        ))}
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  