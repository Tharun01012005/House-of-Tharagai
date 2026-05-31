import { Link } from 'react-router-dom'

function CategoryCard({ category }) {
  return (
    <Link className="category-card" to={`/category/${category.slug}`}>
      <img src={category.image} alt={category.name} />
      <span>{category.name}</span>
      <p>{category.description}</p>
    </Link>
  )
}

export default CategoryCard
