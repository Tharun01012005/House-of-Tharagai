import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { formatPrice, getProductById } from './catalog.js'
import { useCart } from '../context/CartContext.jsx'
import { ProductDetailSkeleton } from '../components/Skeleton.jsx'
import { useSimulatedLoading } from '../hooks/useSimulatedLoading.js'

function ProductDetails() {
  const { id } = useParams()
  const product = getProductById(id)
  const { addToCart } = useCart()
  const [isAdded, setIsAdded] = useState(false)
  const isLoading = useSimulatedLoading([id], 950)

  const handleAddToCart = () => {
    addToCart(product)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  if (isLoading) {
    return <ProductDetailSkeleton />
  }

  if (!product) {
    return (
      <section className="section-shell page-block">
        <div className="empty-state">
          <h1>Product not found</h1>
          <p>The piece you are looking for is not in the current catalog.</p>
          <Link className="button button-primary" to="/shop">
            Continue Shopping
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="section-shell page-block product-detail">
      <div className="product-detail-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-detail-copy">
        <p className="eyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        <p className="price-large">{formatPrice(product.price)}</p>
        <p>{product.description}</p>

        <ul className="detail-list">
          {product.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>

        <div className="product-actions">
          <button 
            className="button button-primary" 
            onClick={handleAddToCart}
          >
            {isAdded ? 'Added to Cart ✨' : 'Add to Cart'}
          </button>
          <Link className="button button-secondary" to="/cart">
            Go to Cart
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails
