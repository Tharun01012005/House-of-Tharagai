import logo from '../assets/products/logo.jpeg'
import bananaCatchClip from '../assets/products/Banana Catch Clip.jpeg'
import bananaCatch from '../assets/products/banana-catch.jpeg'
import bowHairTieSet from '../assets/products/Bow Hair Tie Set.jpeg'
import butterflyGoldBangle from '../assets/products/bracelet3.jpeg'
import evilEyeButterflyBracelet from '../assets/products/bracelet2.jpeg'
import butterflyCharmBracelet from '../assets/products/bracelet7.jpeg'
import floralGoldKada from '../assets/products/bracelet4.jpeg'
import blackHeartBracelet from '../assets/products/bracelet5.jpeg'
import multiStoneBracelet from '../assets/products/bracelet6.jpeg'
import goldHoopJewellery from '../assets/products/bracelet10.jpeg'
import floralMiniClawClip from '../assets/products/Floral Mini Claw Clip.jpeg'
import flowerCatchClip from '../assets/products/flower-clip.jpeg'
import flowerCatchClipColor from '../assets/products/flower-clip1.jpeg'
import kidsJewellerySet from '../assets/products/kids-jewellery.jpeg'
import ovalMatteHairClip from '../assets/products/Oval Matte Hair Clip.jpeg'
import starClawClip from '../assets/products/Star Claw Clip.jpeg'
import transparentClawClip from '../assets/products/transparent-clip.jpeg'

export const logoImage = logo
export const heroImage = floralGoldKada

export const categories = [
  {
    name: 'Hair Clips',
    slug: 'hair-clips',
    description: 'Claw clips and statement catches for polished everyday styling.',
    image: flowerCatchClip,
  },
  {
    name: 'Banana Catches',
    slug: 'banana-catches',
    description: 'Comfortable curved catches with a soft, secure hold.',
    image: bananaCatchClip,
  },
  {
    name: 'Bracelets',
    slug: 'bracelets',
    description: 'Gold-tone bangles, charms, and stackable wrist accents.',
    image: butterflyGoldBangle,
  },
  {
    name: 'Anti-Tarnish Jewellery',
    slug: 'anti-tarnish-jewellery',
    description: 'Low-maintenance gold-finish jewellery made for repeat wear.',
    image: goldHoopJewellery,
  },
  {
    name: 'Kids Jewellery',
    slug: 'kids-jewellery',
    description: 'Festive little pieces with sparkle, comfort, and charm.',
    image: kidsJewellerySet,
  },
  {
    name: 'Hair Accessories',
    slug: 'hair-accessories',
    description: 'Bows, ties, and soft finishing touches for quick styling.',
    image: bowHairTieSet,
  },
]

export const products = [
  {
    id: 'butterfly-gold-bangle',
    name: 'Butterfly Gold Bangle',
    category: 'Bracelets',
    categorySlug: 'bracelets',
    price: 299,
    tag: 'New Arrival',
    isNew: true,
    isTrending: true,
    image: butterflyGoldBangle,
    description:
      'A delicate gold-tone bangle with butterfly accents and a refined shine for daily styling.',
    details: ['Butterfly accent detail', 'Gold-tone finish', 'Lightweight everyday feel'],
  },
  {
    id: 'evil-eye-butterfly-bracelet',
    name: 'Evil Eye Butterfly Bracelet',
    category: 'Bracelets',
    categorySlug: 'bracelets',
    price: 249,
    tag: 'Trending',
    isTrending: true,
    image: evilEyeButterflyBracelet,
    description:
      'A charming bracelet with evil eye motifs and butterfly details for a playful protective touch.',
    details: ['Evil eye charm', 'Butterfly detailing', 'Adjustable bracelet style'],
  },
  {
    id: 'butterfly-charm-bracelet',
    name: 'Butterfly Charm Bracelet',
    category: 'Bracelets',
    categorySlug: 'bracelets',
    price: 349,
    tag: 'Best Seller',
    isTrending: true,
    image: butterflyCharmBracelet,
    description:
      'A polished charm bracelet with butterfly-inspired details and a clean gold finish.',
    details: ['Charm bracelet silhouette', 'Gold-tone polish', 'Easy gifting choice'],
  },
  {
    id: 'floral-gold-kada',
    name: 'Floral Gold Kada',
    category: 'Bracelets',
    categorySlug: 'bracelets',
    price: 399,
    tag: 'Statement',
    isNew: true,
    isTrending: true,
    image: floralGoldKada,
    description:
      'A statement kada with floral enamel work and a warm gold base for festive styling.',
    details: ['Floral enamel detail', 'Structured kada fit', 'Festive gold finish'],
  },
  {
    id: 'black-heart-bracelet',
    name: 'Black Heart Bracelet',
    category: 'Bracelets',
    categorySlug: 'bracelets',
    price: 279,
    tag: 'Limited',
    image: blackHeartBracelet,
    description:
      'A minimal bracelet with a black heart detail for a bold but feminine accent.',
    details: ['Black heart motif', 'Slim profile', 'Pairs well with stacks'],
  },
  {
    id: 'multi-stone-bracelet',
    name: 'Multi Stone Bracelet',
    category: 'Bracelets',
    categorySlug: 'bracelets',
    price: 329,
    tag: 'New Arrival',
    isNew: true,
    image: multiStoneBracelet,
    description:
      'A modern bracelet with multi-stone accents that adds texture to simple outfits.',
    details: ['Mixed stone look', 'Gold-tone base', 'Layer-friendly design'],
  },
  {
    id: 'flower-catch-clip',
    name: 'Flower Catch Clip',
    category: 'Hair Clips',
    categorySlug: 'hair-clips',
    price: 149,
    tag: 'Fresh Drop',
    isNew: true,
    image: bananaCatch,
    description:
      'A soft floral catch clip for quick half-up styles, buns, and feminine everyday looks.',
    details: ['Flower silhouette', 'Smooth grip', 'Lightweight hold'],
  },
  {
    id: 'banana-catch-clip',
    name: 'Banana Catch Clip',
    category: 'Banana Catches',
    categorySlug: 'banana-catches',
    price: 99,
    tag: 'Everyday',
    isTrending: true,
    image: bananaCatchClip,
    description:
      'A curved banana catch with matte floral detailing and comfortable teeth for all-day hold.',
    details: ['Curved banana shape', 'Matte finish colors', 'Comfortable grip'],
  },
  {
    id: 'star-claw-clip',
    name: 'Star Claw Clip',
    category: 'Hair Clips',
    categorySlug: 'hair-clips',
    price: 129,
    tag: 'Playful',
    image: starClawClip,
    description:
      'A star-shaped claw clip that brings a playful accent to quick twists and casual updos.',
    details: ['Star shape', 'Compact claw grip', 'Cute color assortment'],
  },
  {
    id: 'transparent-claw-clip',
    name: 'Transparent Claw Clip',
    category: 'Hair Clips',
    categorySlug: 'hair-clips',
    price: 119,
    tag: 'Trending',
    isTrending: true,
    image: transparentClawClip,
    description:
      'A transparent mini claw clip set with glossy colors for easy sectioning and styling.',
    details: ['Transparent finish', 'Mini claw shape', 'Assorted colors'],
  },
  {
    id: 'oval-matte-hair-clip',
    name: 'Oval Matte Hair Clip',
    category: 'Hair Clips',
    categorySlug: 'hair-clips',
    price: 139,
    tag: 'Minimal',
    image: ovalMatteHairClip,
    description:
      'A matte oval clip with a clean profile for effortless everyday hair styling.',
    details: ['Oval matte finish', 'Neutral and glossy mix', 'Secure claw grip'],
  },
  {
    id: 'floral-mini-claw-clip',
    name: 'Floral Mini Claw Clip',
    category: 'Hair Clips',
    categorySlug: 'hair-clips',
    price: 159,
    tag: 'New Arrival',
    isNew: true,
    image: floralMiniClawClip,
    description:
      'A set of mini floral claws in translucent colors for soft, Instagram-ready styling.',
    details: ['Mini floral claws', 'Translucent color palette', 'Great for sectioned styles'],
  },
  {
    id: 'bow-hair-tie-set',
    name: 'Bow Hair Tie Set',
    category: 'Hair Accessories',
    categorySlug: 'hair-accessories',
    price: 89,
    tag: 'Sweet Pick',
    isNew: true,
    image: bowHairTieSet,
    description:
      'A pastel bow hair tie set that adds a sweet finishing touch to ponytails and braids.',
    details: ['Bow detail', 'Pastel color mix', 'Gentle everyday tie'],
  },
  {
    id: 'kids-jewellery-set',
    name: 'Kids Jewellery Set',
    category: 'Kids Jewellery',
    categorySlug: 'kids-jewellery',
    price: 499,
    tag: 'Kids Edit',
    isTrending: true,
    image: kidsJewellerySet,
    description:
      'A festive kids jewellery set with a decorative necklace and matching traditional charm.',
    details: ['Kids festive styling', 'Decorative necklace', 'Occasion-ready sparkle'],
  },
  {
    id: 'gold-hoop-jewellery',
    name: 'Gold Hoop Jewellery',
    category: 'Anti-Tarnish Jewellery',
    categorySlug: 'anti-tarnish-jewellery',
    price: 649,
    tag: 'Premium',
    isTrending: true,
    image: goldHoopJewellery,
    description:
      'A premium gold-tone jewellery piece with a warm anti-tarnish look for repeat styling.',
    details: ['Anti-tarnish style finish', 'Warm gold tone', 'Premium occasion accent'],
  },
  {
    id: 'color-flower-catch-clip',
    name: 'Color Flower Catch Clip',
    category: 'Hair Clips',
    categorySlug: 'hair-clips',
    price: 149,
    tag: 'Color Pop',
    image: flowerCatchClipColor,
    description:
      'A colorful floral clip set for bright, playful hairstyles and easy gifting.',
    details: ['Glossy flower design', 'Assorted colors', 'Light claw grip'],
  },
]

export function formatPrice(price) {
  return new Intl.NumberFormat('en-IN', {
    currency: 'INR',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(price)
}

export function getCategoryBySlug(slug) {
  return categories.find((category) => category.slug === slug)
}

export function getProductById(id) {
  return products.find((product) => product.id === id)
}

const productOrder = new Map(products.map((product, index) => [product.id, index]))

function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
}

function matchesQuery(product, query) {
  if (!query) return true

  const searchableText = [
    product.name,
    product.category,
    product.description,
    product.tag,
    ...(product.details || []),
  ]
    .join(' ')
    .toLowerCase()

  return searchableText.includes(query)
}

function compareByFeaturedOrder(firstProduct, secondProduct) {
  return (productOrder.get(firstProduct.id) || 0) - (productOrder.get(secondProduct.id) || 0)
}

export function filterCatalogProducts(
  catalogProducts,
  {
    category = 'all',
    query = '',
    sort = 'featured',
  } = {}
) {
  const normalizedQuery = normalizeText(query)

  const filteredProducts = catalogProducts.filter((product) => {
    const matchesCategory = category === 'all' || product.categorySlug === category
    return matchesCategory && matchesQuery(product, normalizedQuery)
  })

  const sortedProducts = [...filteredProducts]

  if (sort === 'price-low-high') {
    return sortedProducts.sort((firstProduct, secondProduct) => firstProduct.price - secondProduct.price)
  }

  if (sort === 'price-high-low') {
    return sortedProducts.sort((firstProduct, secondProduct) => secondProduct.price - firstProduct.price)
  }

  if (sort === 'new-arrivals') {
    return sortedProducts.sort((firstProduct, secondProduct) => {
      if (firstProduct.isNew === secondProduct.isNew) {
        return compareByFeaturedOrder(firstProduct, secondProduct)
      }

      return firstProduct.isNew ? -1 : 1
    })
  }

  return sortedProducts.sort(compareByFeaturedOrder)
}

export function getCatalogMatches(catalogProducts, query = '') {
  return filterCatalogProducts(catalogProducts, { query })
}
