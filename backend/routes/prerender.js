const express = require('express')
const Product = require('../models/Product')

const router = express.Router()
const BASE_URL = 'https://at-dental.com'

function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const CATEGORY_LABELS = {
  'usage-unique': 'Usage Unique',
  'hygiene': 'Hygiène & Désinfection',
  'empreinte': 'Empreintes',
  'blanchiment': 'Blanchiment',
  'endodontie': 'Endodontie',
  'ciment': 'Ciment',
  'restauration': 'Restauration',
  'reconstitution': 'Reconstitution',
  'fraise': 'Fraises & Polissage',
  'instrumentation': 'Instrumentation',
  'petit-equipement': 'Petit Équipement',
  'grand-equipement': 'Grand Équipement',
  'fauteuils': 'Fauteuils Dentaires',
  'technologie': 'Technologie',
}

router.get('/products/:idOrSlug', async (req, res) => {
  try {
    const { idOrSlug } = req.params
    const isId = /^[a-f\d]{24}$/i.test(idOrSlug)
    const product = isId
      ? await Product.findById(idOrSlug)
      : await Product.findOne({ slug: idOrSlug })

    if (!product) return res.redirect(302, `${BASE_URL}/products`)

    const slug = product.slug || product._id
    const canonical = `${BASE_URL}/products/${slug}`
    const title = `${product.name.fr} — AT Dental`
    const desc =
      product.description?.fr ||
      `${product.name.fr} — Fourniture dentaire disponible chez AT Dental, distributeur au Maroc.`
    const image = product.images?.[0] || `${BASE_URL}/images/logoAtDental.jpg`
    const categoryLabel = CATEGORY_LABELS[product.category] || product.category

    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name.fr,
      description: desc,
      image: product.images || [],
      brand: { '@type': 'Brand', name: product.brand },
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'MAD',
        availability: product.inStock
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
        seller: { '@type': 'Organization', name: 'AT Dental' },
      },
    }

    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Produits', item: `${BASE_URL}/products` },
        { '@type': 'ListItem', position: 3, name: product.name.fr, item: canonical },
      ],
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.setHeader('Cache-Control', 'public, max-age=86400')
    res.send(`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="product">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:image" content="${esc(image)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:site_name" content="AT Dental">
  <meta property="og:locale" content="fr_MA">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(desc)}">
  <meta name="twitter:image" content="${esc(image)}">
  <script type="application/ld+json">${JSON.stringify(productSchema)}</script>
  <script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #1a2b3c; }
    h1 { color: #0d3b6e; }
    img { max-width: 400px; border-radius: 8px; margin: 16px 0; }
    .badge { display: inline-block; background: #e8f4f8; color: #0d3b6e; padding: 4px 12px; border-radius: 4px; font-size: 14px; margin: 4px 2px; }
    .cta { display: inline-block; margin-top: 20px; padding: 12px 24px; background: #0d3b6e; color: white; text-decoration: none; border-radius: 6px; }
    nav { margin-bottom: 20px; } nav a { color: #0d3b6e; }
  </style>
</head>
<body>
  <nav><a href="${BASE_URL}">AT Dental</a> &rsaquo; <a href="${BASE_URL}/products">Produits</a> &rsaquo; ${esc(product.name.fr)}</nav>
  <h1>${esc(product.name.fr)}</h1>
  <span class="badge">${esc(product.brand)}</span>
  <span class="badge">${esc(categoryLabel)}</span>
  ${product.images?.[0] ? `<br><img src="${esc(product.images[0])}" alt="${esc(product.name.fr)}">` : ''}
  <p>${esc(desc)}</p>
  <a class="cta" href="${canonical}">Voir la fiche complète sur AT Dental</a>
</body>
</html>`)
  } catch (err) {
    console.error('Prerender error:', err)
    res.redirect(302, `${BASE_URL}/products`)
  }
})

module.exports = router
