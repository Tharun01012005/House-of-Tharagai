import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthenticated } = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
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

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formData.email.trim()) {
      setError('Email is required')
      return
    }

    if (!formData.password.trim()) {
      setError('Password is required')
      return
    }

    setLoading(true)

    try {
      await login({
        email: formData.email.trim(),
        password: formData.password,
      })
      // Navigation is handled by useEffect when isAuthenticated becomes true
    } catch (loginError) {
      setError(loginError.message)
      setLoading(false)
    } 
  }

  return (
    <section className="section-shell page-block auth-layout">
      <div className="page-intro auth-intro">
        <p className="eyebrow">Welcome back</p>
        <h1>Login</h1>
        <p>Sign in to continue shopping with your House of Tharagai profile.</p>
      </div>

      <form className="auth-card" onSubmit={handleSubmit}>
        {location.state?.message ? <div className="auth-banner">{location.state.message}</div> : null}
        {error ? <div className="auth-banner auth-banner-error">{error}</div> : null}

        <label>
          Email
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
        </label>

        <label>
          Password
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Your password" />
        </label>

        <button className="button button-primary" type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Login'}
        </button>

        <p className="auth-switch">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </section>
  )
}

export default Login
