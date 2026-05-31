import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { categories, logoImage } from '../pages/catalog.js'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const navItemClassName = ({ isActive }) => `nav-item-link${isActive ? ' active' : ''}`

function Navbar() {
  const { cartCount } = useCart()
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false)
  const [accountMenuOpen, setAccountMenuOpen] = useState(false)

  const closeMenus = () => {
    setDropdownOpen(false)
    setMenuOpen(false)
    setMobileCategoriesOpen(false)
    setAccountMenuOpen(false)
  }

  useEffect(() => {
    setDropdownOpen(false)
    setMenuOpen(false)
    setMobileCategoriesOpen(false)
    setAccountMenuOpen(false)
  }, [pathname])

  const handleCategoryClick = () => {
    closeMenus()
  }

  const handleLogout = () => {
    logout()
    closeMenus()
    navigate('/login', { replace: true })
  }

  const handleAccountToggle = () => {
    setAccountMenuOpen((current) => !current)
    setMenuOpen(false)
    setMobileCategoriesOpen(false)
  }

  const handleAccountItemClick = (path) => {
    closeMenus()
    navigate(path)
  }

  const accountIsActive = accountMenuOpen || pathname.startsWith('/login') || pathname.startsWith('/register') || pathname.startsWith('/profile')

  return (
    <header className="site-header">
      <nav className="navbar section-shell" aria-label="Main navigation">
        <Link className="brand-mark" to="/" onClick={closeMenus}>
          <img src={logoImage} alt="" />
          <span>House of Tharagai</span>
        </Link>

        <div className="nav-links">
          <NavLink to="/" end className={navItemClassName} onClick={closeMenus}>Home</NavLink>
          <NavLink to="/shop" className={navItemClassName} onClick={closeMenus}>Shop</NavLink>
          <div
            className="category-menu"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="category-trigger" type="button" aria-haspopup="menu" aria-expanded={dropdownOpen}>
              Categories
            </button>
            <div className={`category-popover ${dropdownOpen ? 'is-open' : ''}`}>
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  onClick={handleCategoryClick}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
          <NavLink to="/contact" className={navItemClassName} onClick={closeMenus}>Contact</NavLink>
        </div>

        <div className="navbar-actions">
          {!isAuthenticated ? (
            <div className="auth-links-desktop">
              <NavLink to="/login" className={navItemClassName} onClick={closeMenus}>Login</NavLink>
              <NavLink to="/register" className={navItemClassName} onClick={closeMenus}>Register</NavLink>
            </div>
          ) : (
            <div className="auth-links-desktop">
              <NavLink to="/profile" className={navItemClassName} onClick={closeMenus}>Profile</NavLink>
              <button type="button" className="nav-item-link nav-item-button" onClick={handleLogout}>Logout</button>
            </div>
          )}
          <NavLink className="cart-link" to="/cart" aria-label="Cart" onClick={closeMenus}>
            <div className="cart-icon-wrapper">
              <svg viewBox="0 0 24 24" width="20" height="20" role="presentation" aria-hidden="true" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
                <path d="M7 6h14l-1.7 8.5a2 2 0 0 1-2 1.5H9.2a2 2 0 0 1-2-1.6L5.8 3.8H3" />
                <circle cx="9.5" cy="20" r="1.3" />
                <circle cx="17.5" cy="20" r="1.3" />
              </svg>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </div>
            <span>Cart</span>
          </NavLink>
          <div className="mobile-account-menu">
            <button
              type="button"
              className={`mobile-account-trigger${accountIsActive ? ' is-active' : ''}`}
              aria-label={isAuthenticated ? 'Open profile menu' : 'Open account menu'}
              aria-haspopup="menu"
              aria-expanded={accountMenuOpen}
              onClick={handleAccountToggle}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" role="presentation" aria-hidden="true">
                <circle cx="12" cy="8.5" r="3.5" />
                <path d="M5.5 19a6.5 6.5 0 0 1 13 0" />
              </svg>
              <span className="sr-only">{isAuthenticated ? 'Profile' : 'Account'}</span>
            </button>

            <div className={`mobile-account-popover ${accountMenuOpen ? 'is-open' : ''}`} role="menu" aria-label="Account menu">
              {!isAuthenticated ? (
                <>
                  <button type="button" className="mobile-account-item" onClick={() => handleAccountItemClick('/login')}>Login</button>
                  <button type="button" className="mobile-account-item" onClick={() => handleAccountItemClick('/register')}>Register</button>
                </>
              ) : (
                <>
                  <button type="button" className="mobile-account-item" onClick={() => handleAccountItemClick('/profile')}>My Profile</button>
                  <button type="button" className="mobile-account-item mobile-account-item-danger" onClick={handleLogout}>Logout</button>
                </>
              )}
            </div>
          </div>
          <button
            type="button"
            className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => {
              setMenuOpen((current) => !current)
              setAccountMenuOpen(false)
            }}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <div className={`mobile-nav-panel ${menuOpen ? 'is-open' : ''}`}>
          <NavLink to="/" end className={navItemClassName} onClick={closeMenus}>Home</NavLink>
          <NavLink to="/shop" className={navItemClassName} onClick={closeMenus}>Shop</NavLink>
          <button
            type="button"
            className="mobile-category-toggle"
            aria-expanded={mobileCategoriesOpen}
            onClick={() => setMobileCategoriesOpen((current) => !current)}
          >
            <span>Categories</span>
            <span className={`mobile-toggle-caret ${mobileCategoriesOpen ? 'is-open' : ''}`}>▾</span>
          </button>
          <div className={`mobile-category-links ${mobileCategoriesOpen ? 'is-open' : ''}`}>
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                onClick={handleCategoryClick}
              >
                {category.name}
              </Link>
            ))}
          </div>
          <NavLink to="/contact" className={navItemClassName} onClick={closeMenus}>Contact</NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
