import { Link } from 'react-router-dom'
import { categories, logoImage } from '../pages/catalog.js'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-shell footer-grid">
        <div className="footer-brand footer-column">
          <Link to="/" className="footer-logo">
            <img src={logoImage} alt="" />
            <span>House of Tharagai</span>
          </Link>
          <p className="footer-description">Premium hair accessories and everyday jewellery with a soft gold finish.</p>
          <a
            href="https://www.instagram.com/house_of_tharagai?igsh=MXFtOW8zb2sxcnRzZA=="
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </div>

        <div className="footer-column">
          <h4>Quick Links</h4>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/cart">Cart</Link>
          </div>
        </div>

        <div className="footer-column">
          <h4>Categories</h4>
          <div className="footer-links">
            {categories.slice(0, 4).map((category) => (
              <Link key={category.slug} to={`/category/${category.slug}`}>
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="footer-column footer-contact">
          <h4>Contact</h4>
          <p>hello@houseoftharagai.com</p>
          <p>+91 98765 43210</p>
          <p>Mon to Sat, 10 AM - 7 PM</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
