require('dotenv').config({ path: require('path').join(__dirname, '../.env') })
const mongoose = require('mongoose')
const cloudinary = require('cloudinary').v2
const Product = require('../models/Product')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const imageMap = [
  {
    name: 'Castellini Puma Eli',
    url: 'https://www.castellini.com/hubfs/CASTELLINI/Images/Castellini_eli%20R2026.jpg',
  },
  {
    name: 'Castellini Skyma 5',
    url: 'https://www.castellini.com/hubfs/CASTELLINI/Images/Castellini_Skema52026.jpg',
  },
  {
    name: 'Castellini Skyma 6',
    url: 'https://www.castellini.com/hubfs/CASTELLINI/Images/Castellini_Skema62026.jpg',
  },
  {
    name: 'Stern Weber S200',
    url: 'https://www.sternweber.it/hubfs/Sternweber2025/Prodotti/SW%20Prodotto%201%20(8)%20(1).png',
  },
  {
    name: 'Stern Weber S220 TR',
    url: 'https://www.sternweber.it/hubfs/STERN%20WEBER/Prodotti/SW%20Prodotto%201%20(11)%20(1).png',
  },
  {
    name: 'Stern Weber S300',
    url: 'https://www.sternweber.it/hubfs/Sternweber2025/Prodotti/SW%20Prodotto%201%20(12).png',
  },
  {
    name: 'Stern Weber S380 TRC',
    url: 'https://www.sternweber.it/hubfs/STERN%20WEBER/Prodotti/SW%20Prodotto%201%20(4)%20(1).png',
  },
  {
    name: 'Runyes Care 11',
    url: 'https://storage.googleapis.com/drive.dentacarts.com/public/products/96/9678_1.jpg',
  },
  {
    name: 'Runyes Care 22',
    url: 'https://www.mesaustralia.com.au/cdn/shop/files/Care22.png?v=1719985462',
  },
  {
    name: 'Runyes Care 33 F',
    url: 'https://www.mesaustralia.com.au/cdn/shop/files/Care33a.png?v=1719987349',
  },
]

async function run() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('MongoDB connecté\n')

  let ok = 0
  let fail = 0

  for (const { name, url } of imageMap) {
    try {
      const result = await cloudinary.uploader.upload(url, {
        folder: 'mat-den',
        resource_type: 'image',
      })
      await Product.findOneAndUpdate(
        { 'name.fr': name },
        { $set: { images: [result.secure_url] } }
      )
      console.log(`✅ ${name}`)
      ok++
    } catch (err) {
      console.log(`❌ ${name} — ${err.message}`)
      fail++
    }
  }

  console.log(`\nTerminé. ${ok} réussis, ${fail} échoués.`)
  await mongoose.disconnect()
}

run().catch(err => { console.error(err); process.exit(1) })
