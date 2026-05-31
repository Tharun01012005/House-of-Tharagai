import { Link, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { ProductCardSkeleton } from '../components/Skeleton.jsx'
import { useSearch } from '../context/SearchContext.jsx'
import { filterCatalogProducts, getCategoryBySlug, products } from './catalog.js'
import { useSimulatedLoading } from '../hooks/useSimulatedLoading.js'

function Category() {
  const { name } = useParams()
  const slug = decodeURIComponent(name || '')
  const category = getCategoryBySlug(slug)
  const { searchQuery } = useSearch()
  const isLoading = useSimulatedLoading([slug], 900)
  const categoryProducts = filterCatalogProducts(products, {
    category: slug,
    query: searchQuery,
  })
  const title = category?.name || slug.replaceAll('-', ' ')

  return (
    <section className="section-shell page-block">
      <div className="page-intro">
        <p className="eyebrow">Category</p>
        <h1>{title}</h1>
        <p>
          {category?.description ||
            'A curated selection from the House of Tharagai collection.'}
        </p>
      </div>

      {isLoading ? (
        <div className="product-grid">
          {Array.from({ length: 4 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : categoryProducts.length > 0 ? (
        <div className="product-grid">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No pieces found</h2>
          <p>This category is waiting for its first drop.</p>
          <Link className="button button-primary" to="/shop">
            Back to Shop
          </Link>
        </div>
      )}
    </section>
  )
}

export default Category
