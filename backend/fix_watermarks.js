require('dotenv').config()
const mongoose = require('mongoose')
const cloudinary = require('cloudinary').v2
const Product = require('./models/Product')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Force-replace watermarked images with clean, watermark-free sources
const imageMap = [
  // ── Septodont Détartrex ────────────────────────────────────────
  // Official Septodont Detartrine — dentalprod.com (no watermark)
  { name: 'Détartrex',
    url:  'https://dentalprod.com/cdn/shop/products/Detartrine.png?v=1604413834' },

  // ── Falcon instruments ─────────────────────────────────────────
  // Mouth mirror set — azdentall.com (no watermark)
  { name: 'Manches Miroirs',
    url:  'https://azdentall.com/cdn/shop/files/1_41f99b2b-9f00-476d-a334-645d8145f1d4.jpg' },

  // Endodontic spoon excavator — azdentall.com (no watermark)
  { name: 'Excavateur',
    url:  'https://azdentall.com/cdn/shop/files/19_6d31f251-626e-45c7-b222-caa248080376.jpg' },

  // Graduated periodontal probe — azdentall.com (no watermark)
  { name: 'Sonde Parodontale Graduée',
    url:  'https://azdentall.com/cdn/shop/files/1_845ba16b-b6bf-401c-887c-2321047325e1.jpg?v=1693881025' },

  // Needle holder with lock — azdentall.com (no watermark)
  { name: 'Porte-aiguilles',
    url:  'https://azdentall.com/cdn/shop/files/02_7d00af9f-ecce-49c8-a185-59b08c7ba629.jpg?v=1710578569' },

  // Castroviejo — needle holder family, same clean source
  { name: 'Castroviejo',
    url:  'https://azdentall.com/cdn/shop/files/02_7d00af9f-ecce-49c8-a185-59b08c7ba629.jpg?v=1710578569' },

  // Minimally invasive root elevator set — azdentall.com (no watermark)
  { name: 'Élévateur à Racine',
    url:  'https://azdentall.com/cdn/shop/products/4_8d1172c6-b008-4ffc-96d2-080840d6765f.jpg?v=1637290658' },

  // Chompret Syndesmotome — same elevator family (no watermark)
  { name: 'Chompret Syndesmotome',
    url:  'https://azdentall.com/cdn/shop/products/4_8d1172c6-b008-4ffc-96d2-080840d6765f.jpg?v=1637290658' },

  // Bone file/rasp — stand-in: elevator set (same surgical stainless category)
  { name: 'Râpe à Os',
    url:  'https://azdentall.com/cdn/shop/products/4_8d1172c6-b008-4ffc-96d2-080840d6765f.jpg?v=1637290658' },

  // Bone chisel — stand-in: elevator set (same surgical stainless category)
  { name: 'Ciseau à Os',
    url:  'https://azdentall.com/cdn/shop/products/4_8d1172c6-b008-4ffc-96d2-080840d6765f.jpg?v=1637290658' },

  // Residual root tweezers — azdentall.com (no watermark)
  { name: 'Précelle Mathieu',
    url:  'https://azdentall.com/cdn/shop/files/0_8d1fe2f7-d350-4423-90f4-b6679c96dd48.jpg?v=1741936392' },

  // Orthodontic separator pliers — azdentall.com (no watermark)
  { name: 'Pince Mathieu',
    url:  'https://azdentall.com/cdn/shop/files/02_223c0b08-a2b5-4791-853d-7ae538cb2d0f.jpg' },

  // Endodontic hand plugger (condenser/fouloir) — azdentall.com (no watermark)
  { name: 'Fouloir',
    url:  'https://azdentall.com/cdn/shop/files/07_496145ff-c864-41f7-b61b-10d7f7079cb6.jpg' },
]

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB connecté\n')

    let ok = 0, failed = 0

    for (const { name, url } of imageMap) {
      try {
        const result = await cloudinary.uploader.upload(url, {
          folder: 'mat-den',
          resource_type: 'image',
          timeout: 60000,
        })

        const updated = await Product.findOneAndUpdate(
          { 'name.fr': name },
          { $set: { images: [result.secure_url] } },
          { new: true }
        )

        if (updated) {
          console.log(`  ✓ ${name}`)
          console.log(`    → ${result.secure_url}`)
          ok++
        } else {
          console.log(`  ⚠ produit non trouvé en DB : ${name}`)
          failed++
        }
      } catch (err) {
        console.log(`  ✗ ERREUR ${name}: ${err.message}`)
        failed++
      }
    }

    console.log(`\nTerminé — ✓ ${ok} remplacés   ✗ ${failed} erreurs`)
    process.exit(0)
  } catch (err) {
    console.error('Erreur globale:', err)
    process.exit(1)
  }
}

run()
