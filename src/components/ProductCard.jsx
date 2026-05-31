import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../pages/catalog.js'
import { useCart } from '../context/CartContext.jsx'

function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <article className="product-card">
      <Link className="product-image-link" to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} />
        {product.tag && <span>{product.tag}</span>}
      </Link>
      <div className="product-card-body">
        <p>{product.category}</p>
        <h3>
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="product-card-meta">
          <strong>{formatPrice(product.price)}</strong>
          <button 
            className={`view-product-button ${isAdded ? 'added' : ''}`} 
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
          >
            {isAdded ? 'Added ✨' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
