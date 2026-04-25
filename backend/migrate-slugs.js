require('dotenv').config()
const mongoose = require('mongoose')
const Product = require('./models/Product')

function generateSlug(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

async function migrate() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('MongoDB connected\n')

  const products = await Product.find({ slug: { $in: [null, '', undefined] } })
  console.log(`Found ${products.length} products without slugs\n`)

  const usedSlugs = new Set()

  for (const product of products) {
    const base = generateSlug(`${product.name.fr}-${product.brand}`)
    let slug = base
    let i = 1
    while (usedSlugs.has(slug) || await Product.exists({ slug, _id: { $ne: product._id } })) {
      slug = `${base}-${i++}`
    }
    usedSlugs.add(slug)
    await Product.updateOne({ _id: product._id }, { slug })
    console.log(`✅ ${product.name.fr} → /products/${slug}`)
  }

  console.log('\nDone.')
  process.exit(0)
}

migrate().catch((err) => { console.error(err); process.exit(1) })
