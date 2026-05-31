import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function Register() {
  const navigate = useNavigate()
  const { register, isAuthenticated } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    if (error) setError('')
  }

  const validate = () => {
    if (!formData.name.trim()) return 'Full Name is required'
    if (!formData.email.trim()) return 'Email is required'
    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) return 'Please enter a valid email address'
    if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) return 'Phone number must be exactly 10 digits'
    if (formData.password.length < 6) return 'Password must be at least 6 characters'
    return ''
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)

    try {
      await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
      })
      // Navigation is handled by useEffect when isAuthenticated becomes true
    } catch (registerError) {
      setError(registerError.message)
      setLoading(false)
    } 
  }

  return (
    <section className="section-shell page-block auth-layout">
      <div className="page-intro auth-intro">
        <p className="eyebrow">Join the collection</p>
        <h1>Register</h1>
        <p>Create your profile for faster checkout and saved customer details.</p>
      </div>

      <form className="auth-card" onSubmit={handleSubmit}>
        {error ? <div className="auth-banner auth-banner-error">{error}</div> : null}

        <label>
          Full Name
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your full name" />
        </label>

        <label>
          Email
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
        </label>

        <label>
          Phone Number
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} onInput={(e) => { e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10) }} placeholder="10 digit phone number" maxLength={10} />
        </label>

        <label>
          Password
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="At least 6 characters" />
        </label>

        <button className="button button-primary" type="submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Create Account'}
        </button>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </section>
  )
}

export default Register
