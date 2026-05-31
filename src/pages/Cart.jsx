import { Link } from 'react-router-dom'
import { formatPrice } from './catalog.js'
import { useCart } from '../context/CartContext.jsx'

function Cart() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart, subtotal, shipping, total } = useCart()

  if (cartItems.length === 0) {
    return (
      <section className="section-shell page-block">
        <div className="page-intro">
          <p className="eyebrow">Your bag</p>
          <h1>Cart</h1>
        </div>
        <div className="empty-cart-state">
          <h2>Your cart feels a little empty ✨</h2>
          <p>Discover our elegant collection of accessories.</p>
          <Link className="button button-primary" to="/shop">
            Continue Shopping
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="section-shell page-block">
      <div className="page-intro">
        <p className="eyebrow">Your bag</p>
        <h1>Cart</h1>
        <p>Review your selected items before checkout.</p>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              
              <div className="cart-item-details">
                <p>{item.category}</p>
                <h2>{item.name}</h2>
                <div className="cart-item-actions">
                  <button 
                    className="qty-button" 
                    onClick={() => decreaseQuantity(item.id)}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="qty-text">{item.quantity}</span>
                  <button 
                    className="qty-button" 
                    onClick={() => increaseQuantity(item.id)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="cart-item-price-col">
                <strong>{formatPrice(item.price * item.quantity)}</strong>
                <button 
                  className="remove-button" 
                  onClick={() => removeFromCart(item.id)} 
                  title="Remove item"
                  aria-label="Remove item"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside className="summary-box">
          <h2>Order Summary</h2>
          <div>
            <span>Subtotal</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
          <div>
            <span>Shipping</span>
            <strong>{formatPrice(shipping)}</strong>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <strong>{formatPrice(total)}</strong>
          </div>
          <Link className="button button-primary" to="/checkout">
            Checkout
          </Link>
        </aside>
      </div>
    </section>
  )
}

export default Cart
