import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { formatPrice } from './catalog.js'
import { supabase } from '../lib/supabase.js'

const createDraftFromUser = (profileUser) => ({
  name: profileUser?.name || '',
  email: profileUser?.email || '',
  phone: profileUser?.phone || '',
  address: profileUser?.address || '',
  city: profileUser?.city || '',
  pincode: profileUser?.pincode || '',
})

const getInitials = (name = '') =>
  name
    .split(' ')
    .map((part) => part.trim().charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'U'

const formatCustomerSince = (createdAt) => {
  if (!createdAt) return 'Customer since recently'

  const date = new Date(createdAt)

  if (Number.isNaN(date.getTime())) return 'Customer since recently'

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(date)
}

const profileDetails = [
  { key: 'name', label: 'Name', icon: '👤' },
  { key: 'email', label: 'Email', icon: '📧' },
  { key: 'phone', label: 'Phone', icon: '📱' },
  { key: 'address', label: 'Address', icon: '📍' },
  { key: 'city', label: 'City', icon: '🏙️' },
  { key: 'pincode', label: 'Pincode', icon: '📮' },
]

function Profile() {
  const navigate = useNavigate()
  const { user, refreshUser, updateProfile, isAuthenticated, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(() => createDraftFromUser(null))
  const [formErrors, setFormErrors] = useState({})
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(false)
  const [ordersError, setOrdersError] = useState('')
  const [expandedOrderId, setExpandedOrderId] = useState(null)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true, state: { message: 'Please login to continue' } })
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    if (user && !isEditing) {
      setFormData(createDraftFromUser(user))
    }
  }, [user, isEditing])

  useEffect(() => {
    if (isAuthenticated) {
      refreshUser().catch(() => null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  const userId = user?.id

  useEffect(() => {
    if (!isAuthenticated || !userId) {
      return
    }

    let active = true

    const loadOrders = async () => {
      setOrdersLoading(true)
      setOrdersError('')

      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })

        if (error) {
          throw new Error(error.message || 'Failed to load your orders')
        }

        if (active) {
          setOrders(data || [])
        }
      } catch (ordersFetchError) {
        if (active) {
          setOrdersError(ordersFetchError.message)
        }
      } finally {
        if (active) {
          setOrdersLoading(false)
        }
      }
    }

    loadOrders()

    return () => {
      active = false
    }
  }, [isAuthenticated, userId])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: '' }))
    if (error) setError('')
    if (success) setSuccess('')
  }

  const handleEditProfile = () => {
    setFormData(createDraftFromUser(user))
    setError('')
    setSuccess('')
    setFormErrors({})
    setIsEditing(true)
  }

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true, state: { message: 'Please login to continue' } })
  }

  const handleCancel = () => {
    setFormData(createDraftFromUser(user))
    setError('')
    setSuccess('')
    setFormErrors({})
    setIsEditing(false)
  }

  const validateProfileForm = () => {
    const errs = {}
    if (!formData.name.trim()) errs.name = 'Name is required'
    if (formData.phone.trim() && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      errs.phone = 'Phone must be exactly 10 digits'
    }
    if (formData.pincode.trim() && !/^\d{6}$/.test(formData.pincode.replace(/\D/g, ''))) {
      errs.pincode = 'Pincode must be exactly 6 digits'
    }
    setFormErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validateProfileForm()) return

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const updatedUser = await updateProfile({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        pincode: formData.pincode.trim(),
      })
      setFormData(createDraftFromUser(updatedUser))
      setIsEditing(false)
      setSuccess('Profile updated successfully')
    } catch (profileError) {
      setError(profileError.message)
    } finally {
      setLoading(false)
    }
  }

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId))
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <section className="section-shell page-block profile-page">
      <div className="page-intro">
        <p className="eyebrow">Customer account</p>
        <h1>Profile</h1>
        <p>Manage your House of Tharagai details and keep checkout faster.</p>
      </div>

      <div className="profile-shell">
        {error ? <div className="auth-banner auth-banner-error">{error}</div> : null}
        {success ? <div className="auth-banner">{success}</div> : null}

        <section className="profile-card profile-account-card">
          <div className="profile-card-topbar">
            <div className="profile-avatar" aria-hidden="true">
              {getInitials(user?.name)}
            </div>

            <div className="profile-heading-copy">
              <p className="eyebrow">Customer Account</p>
              <h2>{user?.name || 'Your profile'}</h2>
              <p className="profile-meta">Customer since {formatCustomerSince(user?.created_at)}</p>
            </div>

            <div className="profile-action-row">
              {!isEditing ? (
                <>
                  <button className="button profile-primary-action" type="button" onClick={handleEditProfile}>
                    Edit Profile
                  </button>
                  <button className="button profile-secondary-action" type="button" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : null}
            </div>
          </div>

          {!isEditing ? (
            <div className="profile-detail-grid profile-view-grid">
              {profileDetails.map((detail) => (
                <article key={detail.key} className="profile-detail-item">
                  <span className="profile-detail-label">
                    <span className="profile-detail-icon" aria-hidden="true">{detail.icon}</span>
                    {detail.label}
                  </span>
                  <span className="profile-detail-value">{user?.[detail.key] || 'Not provided'}</span>
                </article>
              ))}
            </div>
          ) : (
            <form className="profile-form-grid profile-edit-form" onSubmit={handleSubmit}>
              {profileDetails.map((detail) => (
                <label key={detail.key} className="profile-field">
                  <span>
                    <span className="profile-detail-icon" aria-hidden="true">{detail.icon}</span>
                    {detail.label}
                  </span>
                  <input
                    type={detail.key === 'email' ? 'email' : detail.key === 'phone' ? 'tel' : 'text'}
                    name={detail.key}
                    value={formData[detail.key]}
                    onChange={handleChange}
                    disabled={detail.key === 'email'}
                    className={formErrors[detail.key] ? 'error' : ''}
                  />
                  {formErrors[detail.key] && <span className="input-error">{formErrors[detail.key]}</span>}
                </label>
              ))}

              <div className="profile-form-actions profile-form-actions-inline">
                <button className="button profile-primary-action" type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button className="button profile-secondary-action" type="button" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        </section>

        <section className="profile-card profile-orders-card">
          <div className="profile-orders-header">
            <div>
              <p className="eyebrow">My Orders</p>
              <h2>Previous orders</h2>
            </div>
          </div>

          {ordersLoading ? <p className="profile-orders-empty">Loading your orders...</p> : null}
          {ordersError ? <div className="auth-banner auth-banner-error">{ordersError}</div> : null}

          {!ordersLoading && !ordersError && orders.length === 0 ? (
            <p className="profile-orders-empty">You have not placed any orders yet.</p>
          ) : null}

          {!ordersLoading && !ordersError && orders.length > 0 ? (
            <div className="profile-orders-list">
              {orders.map((order) => {
                const isExpanded = expandedOrderId === (order.id || order.order_id)
                const orderItems = Array.isArray(order.items) ? order.items : []

                return (
                  <article key={order.id || order.order_id} className="profile-order-item-wrapper">
                    <div className="profile-order-item">
                      <div>
                        <strong>{order.order_id}</strong>
                        <p>{new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                      <div className="profile-order-meta">
                        <span>{formatPrice(order.total || 0)}</span>
                        <span>{order.status || 'Pending'}</span>
                        <button
                          type="button"
                          className="order-eye-button"
                          aria-label={isExpanded ? 'Hide order details' : 'View order details'}
                          title={isExpanded ? 'Hide details' : 'View details'}
                          onClick={() => toggleOrderDetails(order.id || order.order_id)}
                        >
                          {isExpanded ? (
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                              <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                              <line x1="1" y1="1" x2="23" y2="23" />
                            </svg>
                          ) : (
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>

                    {isExpanded && orderItems.length > 0 && (
                      <div className="order-items-detail">
                        {orderItems.map((item, idx) => (
                          <div key={item.id || idx} className="order-detail-row">
                            {item.image && <img src={item.image} alt={item.name} className="order-detail-img" />}
                            <div className="order-detail-info">
                              <span className="order-detail-name">{item.name}</span>
                              <span className="order-detail-qty">Qty: {item.quantity}</span>
                            </div>
                            <strong className="order-detail-price">{formatPrice((item.price || 0) * (item.quantity || 1))}</strong>
                          </div>
                        ))}
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
          ) : null}
        </section>
      </div>
    </section>
  )
}

export default Profile
