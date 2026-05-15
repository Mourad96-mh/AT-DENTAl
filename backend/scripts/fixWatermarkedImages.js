require('dotenv').config({ path: require('path').join(__dirname, '../.env') })
const mongoose = require('mongoose')
const cloudinary = require('cloudinary')
const Product = require('../models/Product')

const { v2: cloudinaryV2 } = cloudinary
cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Clean replacement images (no watermarks, official sources)
const fixes = [
  {
    query: { 'name.fr': 'Spatule de Bouche', brand: 'Falcon' },
    imageUrl: 'https://prodentusa.com/wp-content/uploads/2024/11/24A-Cement-Spatula-32-024A-full-600x600.jpg',
  },
  {
    query: { 'name.fr': 'Spatule à Ciment', brand: 'Falcon' },
    imageUrl: 'https://prodentusa.com/wp-content/uploads/2024/11/cement-spatula-22-32-022-full-600x600.jpg',
  },
  {
    query: { 'name.fr': 'Burnissoir', brand: 'Falcon' },
    imageUrl: 'https://storage.googleapis.com/drive.dentacarts.com/public/product_image/8334/833496.png',
  },
  {
    query: { 'name.fr': 'Curette', brand: 'Falcon' },
    imageUrl: 'https://www.falcondental.co.uk/cdn/shop/files/03.jpg',
  },
  {
    query: { 'name.fr': 'Décolleur', brand: 'Falcon' },
    imageUrl: 'https://karlschumacher.com/cdn/shop/products/PEL0715_d4d4b859-8371-4cf3-ad4d-776967810928_512x512.jpg',
  },
  {
    query: { 'name.fr': 'Sonde Dentaire', brand: 'Falcon' },
    imageUrl: 'https://www.falcondental.co.uk/cdn/shop/files/12_6c4631bf-2e5b-47db-a846-221959ca2bc2.jpg',
  },
  {
    query: { 'name.fr': 'Diamond Excel', brand: 'AT Dental' },
    imageUrl: 'https://www.matestdental.com/cdn/shop/files/Diamond-Excel.png',
  },
  // Bisco Bulk Fill — create if missing, otherwise update
  {
    query: { 'name.fr': 'Bulk Fill', brand: 'Bisco' },
    imageUrl: 'https://img.dentistryiq.com/files/base/ebm/diq/image/2018/04/reveal_hd_bulk_lg.png',
    createIfMissing: {
      name: { fr: 'Bulk Fill', en: 'Bulk Fill' },
      brand: 'Bisco',
      category: 'restauration',
      price: 320,
      inStock: true,
      featured: false,
      tags: [],
      slug: 'bulk-fill-bisco',
      description: {
        fr: 'Composite Bisco Bulk Fill, polymérisation en couche unique jusqu\'à 5mm, retrait de polymérisation réduit.',
        en: 'Bisco Bulk Fill composite, single layer polymerization up to 5mm, reduced polymerization shrinkage.',
      },
    },
  },
]

async function uploadFromUrl(url) {
  const result = await cloudinaryV2.uploader.upload(url, { folder: 'mat-den' })
  return result.secure_url
}

async function run() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('MongoDB connecté\n')

  for (const fix of fixes) {
    const label = Object.values(fix.query).join(' / ')
    process.stdout.write(`Processing: ${label} ... `)

    try {
      const newUrl = await uploadFromUrl(fix.imageUrl)
      process.stdout.write('uploaded ✓\n')

      let product = await Product.findOne(fix.query)

      if (!product && fix.createIfMissing) {
        product = await Product.create({ ...fix.createIfMissing, images: [newUrl] })
        console.log(`  → Created new product: ${product.name.fr}`)
      } else if (product) {
        product.images = [newUrl]
        await product.save()
        console.log(`  → Updated: ${newUrl}`)
      } else {
        console.log(`  → SKIPPED (not found in DB and no createIfMissing)`)
      }
    } catch (err) {
      console.log(`  → ERROR: ${err.message}`)
    }
  }

  console.log('\nDone.')
  await mongoose.disconnect()
}

run().catch((err) => { console.error(err); process.exit(1) })
