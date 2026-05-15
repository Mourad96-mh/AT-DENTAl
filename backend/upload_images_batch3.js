require('dotenv').config()
const mongoose = require('mongoose')
const cloudinary = require('cloudinary').v2
const Product = require('./models/Product')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const imageMap = [
  // ── RESTAURATION (Bisco composites) ──────────────────────────
  { name: 'Bisco Micro Esthetic',
    url:  'https://curion.ca/cdn/shop/files/AeliteAestheticEnamel-1200.jpg' },

  { name: 'Bisco Nano Fil Unique',
    url:  'https://curion.ca/cdn/shop/files/AeliteAestheticEnamel-1200.jpg' },

  { name: 'Bisco Nano Fil Flow',
    url:  'https://www.dentrealstore.com/cdn/shop/files/tetric-n-flow-bulkfill-posterior-composite-fluid-bulk-fill-composite-269604.jpg?v=1733213914&width=4096' },

  { name: 'Bisco Bulk Fil',
    url:  'https://www.dentrealstore.com/cdn/shop/files/tetric-n-ceram-bulkfill-posterior-composite-refill-834338.jpg?v=1733213893&width=4096' },

  { name: 'Bisco Nano Fil N',
    url:  'https://curion.ca/cdn/shop/files/AeliteAestheticEnamel-1200.jpg' },

  { name: 'Bisco Micro Esthetic Gingiva',
    url:  'https://curion.ca/cdn/shop/files/AeliteAestheticEnamel-1200.jpg' },

  // ── RECONSTITUTION (acides céramique & silane) ───────────────
  // Condac Porcelana (FGM) — stand-in: Bisco Bis-Silane/Porcelain Primer (same product category)
  { name: 'Condac Porcelana',
    url:  'https://cdn11.bigcommerce.com/s-4xfcjqmnan/images/stencil/565x752/products/489/618/BISCO-Dental-products-Bis-Silane-and-Porcelain-Primer-__78725.1742322671.jpg?c=1' },

  // Prosil — silane agent, stand-in: Bisco Bis-Silane (same product category)
  { name: 'Prosil',
    url:  'https://cdn11.bigcommerce.com/s-4xfcjqmnan/images/stencil/565x752/products/489/618/BISCO-Dental-products-Bis-Silane-and-Porcelain-Primer-__78725.1742322671.jpg?c=1' },

  // ── FRAISE & POLISSAGE ────────────────────────────────────────
  { name: 'Fraise Horico',
    url:  'https://horico-webshop.com/media/catalog/product/F/G/FG001_184.png' },

  // ── INSTRUMENTATION ───────────────────────────────────────────
  { name: 'Manches Miroirs',
    url:  'https://www.dentrealstore.com/cdn/shop/files/rhodium-front-surface-mirror-dental-mouth-mirror-12-pcs-417659.jpg' },

  { name: 'Sonde Dentaire',
    url:  'https://www.dentrealstore.com/cdn/shop/files/lucas-surgical-curette-set-dental-instruments-190119.jpg?v=1733212701&width=4096' },

  { name: 'Décolleur',
    url:  'https://www.dentrealstore.com/cdn/shop/files/lucas-surgical-curette-set-dental-instruments-190119.jpg?v=1733212701&width=4096' },

  { name: 'Curette',
    url:  'https://www.dentrealstore.com/cdn/shop/files/lucas-surgical-curette-set-dental-instruments-190119.jpg?v=1733212701&width=4096' },

  { name: 'Burnissoir',
    url:  'https://www.dentrealstore.com/cdn/shop/files/endodontic-excavator-dental-instruments-844276.jpg?v=1733212217&width=4096' },

  { name: 'Spatule à Ciment',
    url:  'https://www.dentrealstore.com/cdn/shop/files/endodontic-excavator-dental-instruments-844276.jpg?v=1733212217&width=4096' },

  { name: 'Spatule de Bouche',
    url:  'https://www.dentrealstore.com/cdn/shop/files/endodontic-excavator-dental-instruments-844276.jpg?v=1733212217&width=4096' },

  { name: 'Râpe à Os',
    url:  'https://www.dentrealstore.com/cdn/shop/files/lucas-surgical-curette-set-dental-instruments-190119.jpg?v=1733212701&width=4096' },

  { name: 'Castroviejo',
    url:  'https://www.dentrealstore.com/cdn/shop/files/lucas-surgical-curette-set-dental-instruments-190119.jpg?v=1733212701&width=4096' },

  { name: 'Plateaux Inox',
    url:  'https://omssupply.com/cdn/shop/products/Stainless_Steel_Instrument_Tray_570x570_crop_center.jpg?v=1560958527' },

  { name: 'Sonde Parodontale Graduée',
    url:  'https://www.dentrealstore.com/cdn/shop/files/lucas-surgical-curette-set-dental-instruments-190119.jpg?v=1733212701&width=4096' },

  { name: 'Élévateur à Racine',
    url:  'https://www.dentrealstore.com/cdn/shop/files/lucas-surgical-curette-set-dental-instruments-190119.jpg?v=1733212701&width=4096' },

  { name: 'Chompret Syndesmotome',
    url:  'https://www.dentrealstore.com/cdn/shop/files/lucas-surgical-curette-set-dental-instruments-190119.jpg?v=1733212701&width=4096' },

  { name: 'Porte-aiguilles',
    url:  'https://www.dentrealstore.com/cdn/shop/files/lucas-surgical-curette-set-dental-instruments-190119.jpg?v=1733212701&width=4096' },

  { name: 'Pince Mathieu',
    url:  'https://www.dentrealstore.com/cdn/shop/files/lucas-surgical-curette-set-dental-instruments-190119.jpg?v=1733212701&width=4096' },

  { name: 'Précelle Mathieu',
    url:  'https://www.dentrealstore.com/cdn/shop/files/endodontic-excavator-dental-instruments-844276.jpg?v=1733212217&width=4096' },

  { name: 'Ciseau à Os',
    url:  'https://www.dentrealstore.com/cdn/shop/files/lucas-surgical-curette-set-dental-instruments-190119.jpg?v=1733212701&width=4096' },

  { name: 'Excavateur',
    url:  'https://www.dentrealstore.com/cdn/shop/files/endodontic-excavator-dental-instruments-844276.jpg?v=1733212217&width=4096' },

  { name: 'Fouloir',
    url:  'https://www.dentrealstore.com/cdn/shop/files/endodontic-excavator-dental-instruments-844276.jpg?v=1733212217&width=4096' },

  // ── PETIT ÉQUIPEMENT ──────────────────────────────────────────
  { name: 'Moteur Endo Radar Pro',
    url:  'https://dentalprod.com/cdn/shop/products/radar1pro.webp?v=1660721686' },

  { name: 'Moteur Endo C-SMART',
    url:  'https://www.dentrealstore.com/cdn/shop/files/c-smart-i-pilot-endomotor-and-apex-locator-cordless-endodontic-motor-730727.jpg' },

  { name: 'Moteur Endo NSK DT',
    url:  'https://dentalprod.com/cdn/shop/products/NSKEndo-MateDT.webp?v=1660653117' },

  { name: 'Moteur Endo Ionyx',
    url:  'https://www.ionyx.eu/wp-content/uploads/endy-7-micromoteur-localisateur-apex-endodontie-ionyx-fond-gris.jpg' },

  // O-Light II is Woodpecker branded
  { name: 'Lampe O-Light',
    url:  'https://www.dentaltix.com/en/sites/default/files/styles/large/public/lampara-o-light-ii-woodpecker.jpg?itok=H6vsUHlk' },

  { name: 'Lampe COXO Nano',
    url:  'https://coxotec.com/wp-content/uploads/2025/02/Nano-main01-560x560.jpg' },

  { name: 'Lampe Valo X',
    url:  'https://www.clinicalresearchdental.com/cdn/shop/products/VALO-X-LED-Curing-Light-cordless_535x.jpg?v=1670257268' },

  { name: 'Détartreur Max Piezo 7+',
    url:  'https://vsdent.com/cdn/shop/files/MaxPiezo7_1_1800x1800.webp?v=1759145467' },

  { name: 'Turbine Apple Dent',
    url:  'https://humayundental.com/wp-content/uploads/2022/03/31.jpg' },

  { name: 'Turbine COXO',
    url:  'https://coxotec.com/wp-content/uploads/2025/02/1-12-1024x1024.png' },

  // Skyma is a budget/generic brand — no official product pages found; COXO turbine used as stand-in
  { name: 'Turbine Skyma Classe B',
    url:  'https://coxotec.com/wp-content/uploads/2025/02/1-12-1024x1024.png' },

  { name: 'Kit Rotatif 3pcs Skyma',
    url:  'https://coxotec.com/wp-content/uploads/2025/02/1-12-1024x1024.png' },

  { name: 'Contre Angle Skyma Classe A',
    url:  'https://coxotec.com/wp-content/uploads/2025/02/1-12-1024x1024.png' },

  { name: 'Contre Angle Skyma Classe B',
    url:  'https://coxotec.com/wp-content/uploads/2025/02/1-12-1024x1024.png' },

  { name: 'Aéropolisseur NSK',
    url:  'https://www.dentrealstore.com/cdn/shop/files/prophy-mate-neo-air-polisher-airflow-device-290635.jpg?v=1733213275&width=4096' },

  { name: 'Aéropolisseur Woodpecker',
    url:  'https://dentalprod.com/cdn/shop/products/AP-H_1.webp?v=1652254973' },
]

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB connecté\n')

    let ok = 0, skipped = 0, failed = 0

    for (const { name, url } of imageMap) {
      try {
        const existing = await Product.findOne({ 'name.fr': name }, 'images')
        if (existing && existing.images && existing.images.length > 0 &&
            existing.images[0].includes('cloudinary')) {
          console.log(`  ↷ déjà uploadé : ${name}`)
          skipped++
          continue
        }

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

    console.log(`\nTerminé — ✓ ${ok} uploadés   ↷ ${skipped} déjà faits   ✗ ${failed} erreurs`)
    process.exit(0)
  } catch (err) {
    console.error('Erreur globale:', err)
    process.exit(1)
  }
}

run()
