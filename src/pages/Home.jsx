import { Link } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import CategoryCard from '../components/CategoryCard.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { ProductCardSkeleton } from '../components/Skeleton.jsx'
import { useSearch } from '../context/SearchContext.jsx'
import { categories, filterCatalogProducts, products } from './catalog.js'
import { useSimulatedLoading } from '../hooks/useSimulatedLoading.js'

function Home() {
  const { searchQuery } = useSearch()
  const isLoading = useSimulatedLoading([], 900)
  const matchedProducts = filterCatalogProducts(products, { query: searchQuery })

  const newArrivals = filterCatalogProducts(
    products.filter((product) => product.isNew),
    { query: searchQuery, sort: 'featured' }
  ).slice(0, 4)
  const trendingProducts = filterCatalogProducts(
    products.filter((product) => product.isTrending),
    { query: searchQuery, sort: 'featured' }
  ).slice(0, 4)

  return (
    <>
      <Hero />

      {searchQuery.trim() ? (
        <section className="section-shell section-block">
          <div className="section-heading">
            <p className="eyebrow">Search results</p>
            <h2>Matching products</h2>
          </div>

          {isLoading ? (
            <div className="product-grid">
              {Array.from({ length: 4 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : matchedProducts.length > 0 ? (
            <div className="product-grid">
              {matchedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2>No matches found</h2>
              <p>Try another keyword such as bracelet, kids, hair, or gold.</p>
            </div>
          )}
        </section>
      ) : null}

      <section className="section-shell section-block">
        <div className="section-heading">
          <p className="eyebrow">Shop by mood</p>
          <h2>Curated Categories</h2>
          <Link to="/shop">View all</Link>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      <section className="section-shell section-block">
        <div className="section-heading">
          <p className="eyebrow">Fresh arrivals</p>
          <h2>New Arrivals</h2>
        </div>
        {isLoading ? (
          <div className="product-grid">
            {Array.from({ length: 4 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="product-grid">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="soft-band">
        <div className="section-shell section-block">
          <div className="section-heading">
            <p className="eyebrow">Loved this week</p>
            <h2>Trending Products</h2>
            <Link to="/shop">Shop all pieces</Link>
          </div>
          {isLoading ? (
            <div className="product-grid">
              {Array.from({ length: 4 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="product-grid">
              {trendingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section-shell instagram-cta">
        <div>
          <p className="eyebrow">Follow the glow</p>
          <h2>Style notes, restocks, and new drops on Instagram.</h2>
        </div>
        <a
          className="button button-primary"
          href="https://www.instagram.com/house_of_tharagai?igsh=MXFtOW8zb2sxcnRzZA=="
          target="_blank"
          rel="noreferrer"
        >
          Visit Instagram
        </a>
      </section>
    </>
  )
}

export default Home
