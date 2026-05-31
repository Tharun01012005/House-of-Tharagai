import { Link } from 'react-router-dom'
import { heroImage } from '../pages/catalog.js'

function Hero() {
  return (
    <section className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="hero-overlay section-shell">
        <p className="eyebrow">Styled with grace</p>
        <h1>Gold-toned details, soft feminine styling, and everyday elegance.</h1>
        <p className="hero-copy">
          Explore real House of Tharagai favourites across bracelets, hair clips,
          banana catches, kids jewellery, and anti-tarnish pieces.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" to="/shop">
            Shop Collection
          </Link>
          <Link className="button button-ghost" to="/category/bracelets">
            Explore Bracelets
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
