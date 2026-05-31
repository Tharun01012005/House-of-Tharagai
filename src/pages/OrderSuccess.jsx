import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { ORDER_ID_STORAGE_KEY } from '../utils/order.js'

function OrderSuccess() {
  const location = useLocation()
  const [orderId, setOrderId] = useState(location.state?.orderId || '')

  useEffect(() => {
    if (location.state?.orderId) {
      setOrderId(location.state.orderId)
      localStorage.setItem(ORDER_ID_STORAGE_KEY, location.state.orderId)
      return
    }

    setOrderId(localStorage.getItem(ORDER_ID_STORAGE_KEY) || '')
  }, [location.state])

  return (
    <section className="section-shell page-block">
      <div className="success-panel" style={{ padding: '60px 40px', textAlign: 'center' }}>
        <p className="eyebrow" style={{ color: 'var(--color-gold-dark)' }}>Order Request Sent ✨</p>
        <h1 style={{ marginBottom: '16px' }}>Your order has been saved ✨</h1>
        <p style={{ color: 'var(--color-muted)', marginBottom: '32px' }}>
          Thank you for shopping with House of Tharagai.<br />
          Your order has been recorded in our system and we'll confirm it soon 💛
        </p>
        {orderId ? (
          <div className="order-id-card">
            <span>Order ID</span>
            <strong>{orderId}</strong>
          </div>
        ) : null}
        <div style={{ marginTop: '8px' }}>
          <Link className="button button-primary" to="/shop">
            Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  )
}

export default OrderSuccess
