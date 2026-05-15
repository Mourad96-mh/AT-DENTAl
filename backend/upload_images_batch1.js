require('dotenv').config()
const mongoose = require('mongoose')
const cloudinary = require('cloudinary').v2
const Product = require('./models/Product')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// 30 products — source image URL → French product name in MongoDB
const imageMap = [
  // ── RESTAURATION (composites universels) ──────────────────────
  { name: 'Palfique LX5',
    url:  'https://tokuyama-dental.com/wp-content/uploads/2021/10/PALFIQUE-LX5-syringe.webp' },

  { name: 'Filtek P60',
    url:  'https://www.clinicalresearchdental.com/cdn/shop/products/Filtek_P60_Posterior_Restorative_Syringe_535x.png?v=1592836192' },

  { name: 'Solar X',
    url:  'https://www.dentrealstore.com/cdn/shop/files/g-aenial-universal-flo-flow-composite-504536.png?v=1733147866&width=4096' },

  { name: 'Te Économe',
    url:  'https://www.dentrealstore.com/cdn/shop/files/tetric-n-ceram-composite-refill-35-g-syringe-793728.jpg?v=1733213923&width=4096' },

  { name: 'Denfil',
    url:  'https://dentalprod.com/cdn/shop/files/3M_ESPE_Filtek_P60_Posterior_Packable_Composite.jpg?v=1768757862' },

  { name: 'Megafil',
    url:  'https://www.clinicalresearchdental.com/cdn/shop/products/Filtek_P60_Posterior_Restorative_Syringe_535x.png?v=1592836192' },

  { name: 'IPS Empress Direct',
    url:  'https://www.dentrealstore.com/cdn/shop/files/ips-empress-direct-aesthetic-composite-refill-3-gr-109175.jpg?v=1733146773&width=4096' },

  { name: 'Tetric Bulk Fill',
    url:  'https://www.dentrealstore.com/cdn/shop/files/tetric-n-ceram-bulkfill-posterior-composite-refill-834338.jpg?v=1733213893&width=4096' },

  { name: 'Filtek Z350 XT',
    url:  'https://dentalprod.com/cdn/shop/files/3M_ESPE_Filtek_P60_Posterior_Packable_Composite.jpg?v=1768757862' },

  // ── RESTAURATION (composites fluides) ─────────────────────────
  { name: 'Z350 Flow',
    url:  'https://dentalprod.com/cdn/shop/products/3m-filte-z350-xt-flowable-restorative-500x500.png?v=1664625564' },

  { name: 'Gradia Flow',
    url:  'https://www.dentrealstore.com/cdn/shop/files/gradia-direct-flo-flow-kompozit_dc266623-34c5-4d82-8580-903d4070410e.png?v=1755607418&width=4096' },

  { name: 'Tetric N Flow',
    url:  'https://www.dentrealstore.com/cdn/shop/files/tetric-n-flow-bulkfill-posterior-composite-fluid-bulk-fill-composite-269604.jpg?v=1733213914&width=4096' },

  { name: 'Flow D Line',
    url:  'https://www.dentrealstore.com/cdn/shop/files/gradia-direct-flo-flow-kompozit_dc266623-34c5-4d82-8580-903d4070410e.png?v=1755607418&width=4096' },

  { name: 'I-Flow',
    url:  'https://www.dentrealstore.com/cdn/shop/files/tetric-n-flow-bulkfill-posterior-composite-fluid-bulk-fill-composite-269604.jpg?v=1733213914&width=4096' },

  { name: 'Compoflow',
    url:  'https://www.dentrealstore.com/cdn/shop/files/g-aenial-universal-flo-flow-composite-504536.png?v=1733147866&width=4096' },

  { name: 'Compomax',
    url:  'https://www.dentrealstore.com/cdn/shop/files/tetric-n-ceram-composite-refill-35-g-syringe-793728.jpg?v=1733213923&width=4096' },

  // ── RECONSTITUTION (adhésifs) ──────────────────────────────────
  { name: 'Adhésif Single Bond 2',
    url:  'https://www.clinicalresearchdental.com/cdn/shop/products/Scotchbond_Universal_Adhesive_5ml_535x.png?v=1592855187' },

  { name: 'Adhésif G Premio Bond',
    url:  'https://www.gc.dental/america/sites/america.gc.dental/files/styles/product_banner_image/public/images/2023-04/g-premio-bond-website-banner.jpg.webp' },

  { name: 'Adhésif Solare Universal Bond',
    url:  'https://www.gc.dental/sea/sites/sea.gc.dental/files/styles/product_banner_image/public/images/2023-08/solare%20universal%20bond.jpg.webp' },

  { name: 'Adhésif Tetric N Bond',
    url:  'https://www.dentrealstore.com/cdn/shop/files/tetric-n-bond-universal-bonding-6-gr-193803.jpg?v=1733213893&width=4096' },

  { name: 'Adhésif All Bond Universal',
    url:  'https://cdn11.bigcommerce.com/s-4xfcjqmnan/images/stencil/1280x1280/products/462/421/bisco_dental_adhesive_all_bond_universal_0003_ABU_Bottle__08945.1730386163.jpg?c=1' },

  { name: 'Adhésif Z Prime Plus',
    url:  'https://cdn11.bigcommerce.com/s-4xfcjqmnan/images/stencil/1280x1280/products/459/428/bisco_dental_primer_0002_Z-PrimePlusBottle_Shadow2ml__64682.1754492829.jpg?c=1' },

  { name: 'Adhésif Te Économe Bond',
    url:  'https://www.dentrealstore.com/cdn/shop/files/excite-f-bonding-2x5-gr-901461.jpg?v=1733147667&width=4096' },

  { name: 'Monobond Plus',
    url:  'https://www.dentrealstore.com/cdn/shop/files/monobond-plus-5gr-universal-primer-769749.jpg?v=1733212874&width=4096' },

  { name: 'Adhésif D Line Bond',
    url:  'https://www.clinicalresearchdental.com/cdn/shop/products/Scotchbond_Universal_Adhesive_5ml_535x.png?v=1592855187' },

  // ── RECONSTITUTION (acides & conditionneurs) ───────────────────
  { name: 'Ultra Etch',
    url:  'https://www.clinicalresearchdental.com/cdn/shop/files/773164_ultra_etch_4pk_kit_package_535x.jpg?v=1773258181' },

  { name: 'Dentaflux Acide 60g',
    url:  'https://www.clinicalresearchdental.com/cdn/shop/files/773164_ultra_etch_4pk_kit_package_535x.jpg?v=1773258181' },

  { name: 'I Gel',
    url:  'https://www.clinicalresearchdental.com/cdn/shop/files/773164_ultra_etch_4pk_kit_package_535x.jpg?v=1773258181' },

  { name: 'Porcelain Etch avec Silane',
    url:  'https://www.clinicalresearchdental.com/cdn/shop/files/773164_ultra_etch_4pk_kit_package_535x.jpg?v=1773258181' },

  { name: 'Porcelain Etch sans Silane',
    url:  'https://www.clinicalresearchdental.com/cdn/shop/files/773164_ultra_etch_4pk_kit_package_535x.jpg?v=1773258181' },
]

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB connecté\n')

    let ok = 0, skipped = 0, failed = 0

    for (const { name, url } of imageMap) {
      try {
        // Check if product already has an image
        const existing = await Product.findOne({ 'name.fr': name }, 'images')
        if (existing && existing.images && existing.images.length > 0 &&
            existing.images[0].includes('cloudinary')) {
          console.log(`  ↷ déjà uploadé : ${name}`)
          skipped++
          continue
        }

        // Upload source image to Cloudinary
        const result = await cloudinary.uploader.upload(url, {
          folder: 'mat-den',
          resource_type: 'image',
          timeout: 60000,
        })

        // Patch MongoDB
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

    console.log(`\nTerminé — ✓ ${ok} uploadés   ↷ ${skipped} déjà faits   ✗ ${failed} erreurs`)
    process.exit(0)
  } catch (err) {
    console.error('Erreur globale:', err)
    process.exit(1)
  }
}

run()
