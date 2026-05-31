export function Skeleton({ className = '' }) {
  return <div className={`skeleton ${className}`.trim()} aria-hidden="true" />
}

export function ProductCardSkeleton() {
  return (
    <article className="product-card product-card-skeleton" aria-hidden="true">
      <Skeleton className="skeleton-image" />
      <div className="product-card-body">
        <Skeleton className="skeleton-line skeleton-line-sm" />
        <Skeleton className="skeleton-line skeleton-line-md" />
        <div className="product-card-meta">
          <Skeleton className="skeleton-line skeleton-line-price" />
          <Skeleton className="skeleton-button" />
        </div>
      </div>
    </article>
  )
}

export function ProductDetailSkeleton() {
  return (
    <section className="section-shell page-block product-detail product-detail-skeleton" aria-hidden="true">
      <Skeleton className="skeleton-detail-image" />
      <div className="product-detail-copy">
        <Skeleton className="skeleton-line skeleton-line-sm" />
        <Skeleton className="skeleton-line skeleton-line-lg" />
        <Skeleton className="skeleton-line skeleton-line-price" />
        <Skeleton className="skeleton-line skeleton-line-md" />
        <Skeleton className="skeleton-line skeleton-line-md" />
        <div className="detail-list skeleton-detail-list">
          <Skeleton className="skeleton-list-item" />
          <Skeleton className="skeleton-list-item" />
          <Skeleton className="skeleton-list-item" />
        </div>
        <div className="product-actions">
          <Skeleton className="skeleton-button" />
          <Skeleton className="skeleton-button" />
        </div>
      </div>
    </section>
  )
}

export function ProductGridSkeleton({ count = 4 }) {
  return (
    <div className="product-grid">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  )
}
