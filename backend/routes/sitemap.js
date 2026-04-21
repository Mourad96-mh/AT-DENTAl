const express = require('express')
const Product = require('../models/Product')

const router = express.Router()

const BASE_URL = 'https://atdental.ma'

const STATIC_PAGES = [
  { path: '/',         changefreq: 'weekly',  priority: '1.0' },
  { path: '/products', changefreq: 'daily',   priority: '0.9' },
  { path: '/services', changefreq: 'monthly', priority: '0.8' },
  { path: '/about',    changefreq: 'monthly', priority: '0.7' },
  { path: '/blog',     changefreq: 'weekly',  priority: '0.7' },
  { path: '/contact',  changefreq: 'monthly', priority: '0.6' },
]

const CATEGORIES = [
  'usage-unique', 'hygiene', 'empreinte', 'blanchiment', 'endodontie',
  'ciment', 'restauration', 'reconstitution', 'fraise', 'instrumentation',
  'petit-equipement', 'grand-equipement', 'fauteuils', 'technologie',
]

const BLOG_SLUGS = [
  'choisir-alginate-empreinte',
  'blanchiment-solutions-professionnelles',
  'maintenance-equipements-dentaires',
  'radiographie-numerique-avantages',
  'biodentine-applications-cliniques',
  'sterilisation-protocoles-cabinet',
]

function urlEntry(path, changefreq, priority) {
  return `
  <url>
    <loc>${BASE_URL}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

// GET /sitemap.xml  (public — no /api prefix)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({}, '_id').lean()

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

    for (const p of STATIC_PAGES) {
      xml += urlEntry(p.path, p.changefreq, p.priority)
    }

    for (const cat of CATEGORIES) {
      xml += urlEntry(`/products?category=${cat}`, 'weekly', '0.8')
    }

    for (const p of products) {
      xml += urlEntry(`/products/${p._id}`, 'weekly', '0.7')
    }

    for (const slug of BLOG_SLUGS) {
      xml += urlEntry(`/blog/${slug}`, 'monthly', '0.6')
    }

    xml += '\n\n</urlset>\n'

    res.setHeader('Content-Type', 'application/xml')
    res.setHeader('Cache-Control', 'public, max-age=3600')
    res.send(xml)
  } catch (err) {
    res.status(500).send('Erreur génération sitemap')
  }
})

module.exports = router
