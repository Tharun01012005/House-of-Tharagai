import { useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import { ProductCardSkeleton } from '../components/Skeleton.jsx'
import { categories, filterCatalogProducts, products } from './catalog.js'
import { useSimulatedLoading } from '../hooks/useSimulatedLoading.js'

const categoryOptions = [
  { label: 'All', value: 'all' },
  ...categories.map((category) => ({ label: category.name, value: category.slug })),
]

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-low-high' },
  { label: 'Price: High to Low', value: 'price-high-low' },
  { label: 'New Arrivals', value: 'new-arrivals' },
]

function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const isLoading = useSimulatedLoading([], 950)

  const visibleProducts = useMemo(
    () =>
      filterCatalogProducts(products, {
        category: selectedCategory,
        query: '',
        sort: sortBy,
      }),
    [selectedCategory, sortBy]
  )

  return (
    <section className="section-shell page-block">
      <div className="page-intro">
        <p className="eyebrow">The full edit</p>
        <h1>Shop House of Tharagai</h1>
        <p>
          Browse the real House of Tharagai collection, from gold-tone bracelets
          to flower clips and kids jewellery.
        </p>
      </div>

      <div className="shop-controls">
        <div className="shop-filters">
          <label className="premium-select-field">
            <span>Category</span>
            <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="premium-select-field">
            <span>Sort</span>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="shop-toolbar">
          <p>{visibleProducts.length} products</p>
          <span>Real product image catalog</span>
        </div>
      </div>

      {isLoading ? (
        <div className="product-grid">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : visibleProducts.length > 0 ? (
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No matching pieces found</h2>
          <p>Try a different filter combination or reset the filters to browse the full edit.</p>
          <button
            className="button button-primary"
            type="button"
            onClick={() => {
              setSelectedCategory('all')
              setSortBy('featured')
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  )
}

export default Shop
