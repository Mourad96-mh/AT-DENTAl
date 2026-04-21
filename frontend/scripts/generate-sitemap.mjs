import { writeFileSync, readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const BASE_URL = 'https://atdental.ma'
const API_URL  = 'https://at-dental-api.onrender.com'
const OUT_FILE = resolve(__dirname, '../public/sitemap.xml')

// ── Static pages ──────────────────────────────────────────────
const STATIC_PAGES = [
  { path: '/',         changefreq: 'weekly',  priority: '1.0' },
  { path: '/products', changefreq: 'daily',   priority: '0.9' },
  { path: '/services', changefreq: 'monthly', priority: '0.8' },
  { path: '/about',    changefreq: 'monthly', priority: '0.7' },
  { path: '/blog',     changefreq: 'weekly',  priority: '0.7' },
  { path: '/contact',  changefreq: 'monthly', priority: '0.6' },
]

// ── Category filter pages ─────────────────────────────────────
const CATEGORIES = [
  'usage-unique', 'hygiene', 'empreinte', 'blanchiment', 'endodontie',
  'ciment', 'restauration', 'reconstitution', 'fraise', 'instrumentation',
  'petit-equipement', 'grand-equipement', 'fauteuils', 'technologie',
]

// ── Blog slugs — add new ones here when you publish ──────────
const BLOG_SLUGS = [
  'choisir-alginate-empreinte',
  'blanchiment-solutions-professionnelles',
  'maintenance-equipements-dentaires',
  'radiographie-numerique-avantages',
  'biodentine-applications-cliniques',
  'sterilisation-protocoles-cabinet',
]

function url(path, changefreq, priority) {
  return `
  <url>
    <loc>${BASE_URL}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

async function fetchProducts() {
  try {
    const res = await fetch(`${API_URL}/api/products?limit=500`)
    if (!res.ok) throw new Error(`API responded ${res.status}`)
    const data = await res.json()
    return data.products || []
  } catch (err) {
    console.warn(`⚠️  Could not fetch products: ${err.message}. Sitemap will skip product URLs.`)
    return []
  }
}

async function generate() {
  console.log('🗺  Generating sitemap...')

  const products = await fetchProducts()
  console.log(`   Found ${products.length} products`)

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

  // Static pages
  for (const p of STATIC_PAGES) {
    xml += url(p.path, p.changefreq, p.priority)
  }

  // Category pages
  for (const cat of CATEGORIES) {
    xml += url(`/products?category=${cat}`, 'weekly', '0.8')
  }

  // Product detail pages
  for (const p of products) {
    xml += url(`/products/${p._id}`, 'weekly', '0.7')
  }

  // Blog posts
  for (const slug of BLOG_SLUGS) {
    xml += url(`/blog/${slug}`, 'monthly', '0.6')
  }

  xml += '\n\n</urlset>\n'

  writeFileSync(OUT_FILE, xml, 'utf-8')
  console.log(`✅ Sitemap written → ${OUT_FILE}`)
  console.log(`   ${STATIC_PAGES.length} static pages + ${CATEGORIES.length} category pages + ${products.length} products + ${BLOG_SLUGS.length} blog posts`)
}

generate()
