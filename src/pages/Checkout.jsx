import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { formatPrice } from './catalog.js'
import { ORDER_ID_STORAGE_KEY, generateOrderId } from '../utils/order.js'
import { supabase } from '../lib/supabase.js'

function Checkout() {
  const navigate = useNavigate()
  const { cartItems, subtotal, shipping, total, clearCart } = useCart()
  const { user, isAuthenticated } = useAuth()
  const orderPlacedRef = useRef(false)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  })

  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Empty Cart Protection
  useEffect(() => {
    if (cartItems.length === 0 && !orderPlacedRef.current) {
      navigate('/cart')
    }
  }, [cartItems, navigate])

  // Pre-fill from user profile
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData((prev) => ({
        name: prev.name || user.name || '',
        phone: prev.phone || user.phone || '',
        address: prev.address || user.address || '',
        city: prev.city || user.city || '',
        pincode: prev.pincode || user.pincode || '',
      }))
    }
  }, [isAuthenticated, user])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Full Name is required'
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required'
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be exactly 10 digits'
    }

    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required'
    } else if (!/^\d{6}$/.test(formData.pincode.replace(/\D/g, ''))) {
      newErrors.pincode = 'Pincode must be exactly 6 digits'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePlaceOrder = async (event) => {
    event.preventDefault()
    if (!validateForm()) return

    if (isSubmitting) return

    setSubmitError('')
    setIsSubmitting(true)

    try {
      const orderId = generateOrderId()

      const orderPayload = {
        order_id: orderId,
        user_id: isAuthenticated && user ? user.id : null,
        customer_name: formData.name.trim(),
        email: isAuthenticated ? user?.email || '' : '',
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        pincode: formData.pincode.trim(),
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        subtotal,
        total,
      }

      console.log('Placing order:', orderPayload)

      const { data, error } = await supabase
        .from('orders')
        .insert(orderPayload)
        .select()
        .single()

      if (error) {
        console.error('Supabase order error:', error)
        throw new Error(error.message || 'Unable to save order')
      }

      if (!data || !data.order_id) {
        throw new Error('Order was saved but no order ID was returned')
      }

      localStorage.setItem(ORDER_ID_STORAGE_KEY, data.order_id)
      orderPlacedRef.current = true
      clearCart()

      navigate('/success', { state: { orderId: data.order_id } })
    } catch (orderError) {
      console.error('Order placement failed:', orderError)
      setSubmitError(orderError.message || 'Failed to place order')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (cartItems.length === 0) return null // Handled by useEffect redirect

  return (
    <section className="section-shell page-block">
      <div className="page-intro">
        <p className="eyebrow">Secure checkout</p>
        <h1>Checkout</h1>
        <p>Complete your purchase by providing your delivery details.</p>
      </div>

      <div className="checkout-layout">
        <form id="checkout-form" className="checkout-form" onSubmit={handlePlaceOrder}>
          <h2>Contact Details</h2>
          <label>
            Full name
            <input 
              type="text" 
              name="name" 
              placeholder="Your name" 
              className={errors.name ? 'error' : ''}
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="input-error">{errors.name}</span>}
          </label>
          <label>
            Phone
            <input 
              type="tel" 
              name="phone" 
              placeholder="Your Phone Number" 
              className={errors.phone ? 'error' : ''}
              value={formData.phone}
              onChange={handleChange}
              onInput={(e) => { e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10) }}
              maxLength={10}
            />
            {errors.phone && <span className="input-error">{errors.phone}</span>}
          </label>

          <h2>Delivery Address</h2>
          <label>
            Address
            <textarea 
              name="address" 
              rows="3" 
              placeholder="House number, street name" 
              className={errors.address ? 'error' : ''}
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && <span className="input-error">{errors.address}</span>}
          </label>
          <label>
            City
            <input 
              type="text" 
              name="city" 
              placeholder="Your city" 
              className={errors.city ? 'error' : ''}
              value={formData.city}
              onChange={handleChange}
            />
            {errors.city && <span className="input-error">{errors.city}</span>}
          </label>
          <label>
            Pincode
            <input 
              type="text" 
              name="pincode" 
              placeholder="Pincode"
              className={errors.pincode ? 'error' : ''}
              value={formData.pincode}
              onChange={handleChange}
              onInput={(e) => { e.target.value = e.target.value.replace(/\D/g, '').slice(0, 6) }}
              maxLength={6}
            />
            {errors.pincode && <span className="input-error">{errors.pincode}</span>}
          </label>
        </form>

        <aside className="summary-box">
          <h2>Order Summary</h2>
          
          <div className="checkout-summary-list">
            {cartItems.map(item => (
              <div className="checkout-summary-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="checkout-summary-details">
                  <p>{item.name}</p>
                  <span>Qty: {item.quantity}</span>
                </div>
                <strong className="checkout-summary-price">{formatPrice(item.price * item.quantity)}</strong>
              </div>
            ))}
          </div>

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
          <button className="button button-primary" type="submit" form="checkout-form" disabled={isSubmitting} style={{ width: '100%', marginTop: '14px' }}>
            {isSubmitting ? 'Placing Order...' : 'Place Order'}
          </button>
          {submitError ? (
            <div className="auth-banner auth-banner-error" style={{ marginTop: '14px' }}>
              {submitError}
            </div>
          ) : null}
        </aside>
      </div>
    </section>
  )
}

export default Checkout
