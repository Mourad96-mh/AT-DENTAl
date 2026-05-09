require('dotenv').config({ path: require('path').join(__dirname, '../.env') })
const mongoose = require('mongoose')
const cloudinary = require('cloudinary').v2
const Product = require('../models/Product')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

async function run() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('MongoDB connecté\n')

  const products = await Product.find({})
  const external = products.filter(p => {
    const url = p.images?.[0] || ''
    return url && !url.includes('cloudinary.com') && !url.includes('placehold.co')
  })

  console.log(`${external.length} produits avec images externes à migrer vers Cloudinary\n`)

  let ok = 0, fail = 0

  for (const product of external) {
    const url = product.images[0]
    const name = product.name?.fr || product._id
    try {
      const result = await cloudinary.uploader.upload(url, {
        folder: 'mat-den',
        resource_type: 'image',
      })
      await Product.findByIdAndUpdate(product._id, { $set: { images: [result.secure_url] } })
      console.log(`✓ ${name}`)
      ok++
    } catch (err) {
      console.log(`✗ ${name} — ${err.message}`)
      fail++
    }
  }

  console.log(`\nTerminé. ${ok} uploadés, ${fail} échoués.`)
  await mongoose.disconnect()
}

run().catch(err => { console.error(err); process.exit(1) })
