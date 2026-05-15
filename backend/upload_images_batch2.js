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
  // ── RECONSTITUTION (temporaires) ──────────────────────────────
  { name: 'Acrytemp',
    url:  'https://www.dentrealstore.com/cdn/shop/files/tempron-temporary-crown-and-bridge-material-composite-based-465431.png?v=1733213926&width=1200' },

  { name: 'Bright Temporary',
    url:  'https://www.dentrealstore.com/cdn/shop/files/tempron-temporary-crown-and-bridge-material-composite-based-465431.png?v=1733213926&width=1200' },

  { name: 'Unifast 3',
    url:  'https://www.dentrealstore.com/cdn/shop/files/tempron-temporary-crown-and-bridge-material-composite-based-465431.png?v=1733213926&width=1200' },

  { name: 'Visalys Temp',
    url:  'https://www.kettenbach-dental.com/fileadmin/_processed_/5/0/csm_13780_Visalys-Temp-A1_Normal-pack_mPrv_web_a4b5610312.png.webp' },

  // ── RECONSTITUTION (acides Bisco) ─────────────────────────────
  { name: 'Bisco Porcelain Etchant',
    url:  'https://cdn11.bigcommerce.com/s-4xfcjqmnan/images/stencil/1280x1280/products/480/632/BISCO_Dental_Products_Etchant_Uni-Etch__60303.1741882812.jpg?c=1' },

  { name: 'Uni Etch',
    url:  'https://cdn11.bigcommerce.com/s-4xfcjqmnan/images/stencil/1280x1280/products/480/632/BISCO_Dental_Products_Etchant_Uni-Etch__60303.1741882812.jpg?c=1' },

  // ── RECONSTITUTION (matériaux de reconstitution) ──────────────
  { name: 'Dentocore Body',
    url:  'https://itena-clinical.com/wp-content/uploads/2024/10/Dentocore_Dentocore-Body-1.png' },

  { name: 'Core Flo DC',
    url:  'https://cdn11.bigcommerce.com/s-4xfcjqmnan/images/stencil/565x752/products/484/413/bisco_dental_products_0000_Core-Flo-A1__31696.1730383990.jpg?c=1' },

  { name: 'All Cem Core',
    url:  'https://cdn11.bigcommerce.com/s-4xfcjqmnan/images/stencil/565x752/products/484/413/bisco_dental_products_0000_Core-Flo-A1__31696.1730383990.jpg?c=1' },

  { name: 'Gradia Core',
    url:  'https://cdn11.bigcommerce.com/s-4xfcjqmnan/images/stencil/565x752/products/484/413/bisco_dental_products_0000_Core-Flo-A1__31696.1730383990.jpg?c=1' },

  { name: 'Repo Core DC',
    url:  'https://cdn11.bigcommerce.com/s-4xfcjqmnan/images/stencil/565x752/products/484/413/bisco_dental_products_0000_Core-Flo-A1__31696.1730383990.jpg?c=1' },

  // ── RECONSTITUTION (tenons fibres) ────────────────────────────
  { name: 'Tenon Fibre Itena',
    url:  'https://www.dentrealstore.com/cdn/shop/files/dentoclic-fiberglass-translucent-post-kit-996556.jpg?v=1733146942&width=4096' },

  { name: 'Tenon Fibre Vivadent',
    url:  'https://www.dentrealstore.com/cdn/shop/files/dentoclic-fiberglass-translucent-post-kit-996556.jpg?v=1733146942&width=4096' },

  { name: 'Tenon Fibre Post',
    url:  'https://www.dentrealstore.com/cdn/shop/files/dentoclic-fiberglass-translucent-post-kit-996556.jpg?v=1733146942&width=4096' },

  { name: 'Tenon Fibre Post 3M',
    url:  'https://www.clinicalresearchdental.com/cdn/shop/products/cf0620b0-50e9-421d-a3d0-f7fd7fbe53fc_535x.png?v=1625111429' },

  // ── RECONSTITUTION (forets) ───────────────────────────────────
  { name: 'Foret Largo',
    url:  'https://www.go-dentaire.com/23251-large_default/perceuse-dentaire-coulissantes-woodpecker.jpg' },

  { name: 'Foret Gates',
    url:  'https://www.go-dentaire.com/23251-large_default/perceuse-dentaire-coulissantes-woodpecker.jpg' },

  // ── RECONSTITUTION (collage facettes) ─────────────────────────
  { name: 'Choice 2 Kit',
    url:  'https://cdn11.bigcommerce.com/s-4xfcjqmnan/images/stencil/1280x1280/products/433/609/choice_2_dental_veneer_cement_A1_1200x1200__95845.1739911568.jpg?c=1' },

  { name: 'Intraoral Repair Kit',
    url:  'https://cdn11.bigcommerce.com/s-4xfcjqmnan/images/stencil/1280x1280/products/444/489/bisco-dental-products-intraoral-repair-kit__39393.1730388091.jpg?c=1' },

  { name: 'Relyx Veneer',
    url:  'https://www.clinicalresearchdental.com/cdn/shop/products/3de0acdf-cc5c-4641-95ec-e01dc4b5b297_535x.png?v=1625111423' },

  { name: 'Variolink N',
    url:  'https://www.dentrealstore.com/cdn/shop/files/variolink-n-base-refill-1x25g-716364.jpg?v=1733214236&width=4096' },

  // ── FRAISE & POLISSAGE ────────────────────────────────────────
  { name: 'Diamond Excel',
    url:  'https://www.dentrealstore.com/cdn/shop/files/septodont-detartrine-dental-paste-for-scaling-oral-prophylaxis-polishing-material-749279.png?v=1733213616&width=4096' },

  { name: 'Spectra',
    url:  'https://www.clinicalresearchdental.com/cdn/shop/products/3M_ESPE_Sof-Lex_ContouringandPolishingDiscsRefill_1-2in_1.27cm_fine_535x.jpg?v=1589492105' },

  { name: 'Dentaflux Pâte Prophylactique',
    url:  'https://www.dentrealstore.com/cdn/shop/files/septodont-detartrine-dental-paste-for-scaling-oral-prophylaxis-polishing-material-749279.png?v=1733213616&width=4096' },

  { name: 'Détartrex',
    url:  'https://www.dentrealstore.com/cdn/shop/files/septodont-detartrine-dental-paste-for-scaling-oral-prophylaxis-polishing-material-749279.png?v=1733213616&width=4096' },

  { name: 'Cavex Prophy Paste',
    url:  'https://www.cavex.nl/wp-content/uploads/2023/03/Cavex-Prophypaste-tubes-DA-award-787x800.jpg' },

  { name: 'Cupule Dochem',
    url:  'https://www.clinicalresearchdental.com/cdn/shop/files/JiffyAssorted_535x.png?v=1682953034' },

  { name: 'Composite Polish Kit',
    url:  'https://www.clinicalresearchdental.com/cdn/shop/files/JiffyAssorted_535x.png?v=1682953034' },

  { name: 'Kit Disque Tor',
    url:  'https://www.clinicalresearchdental.com/cdn/shop/products/3M_ESPE_Sof-Lex_ContouringandPolishingDiscsRefill_1-2in_1.27cm_fine_535x.jpg?v=1589492105' },

  { name: 'Brossette de Polissage',
    url:  'https://www.clinicalresearchdental.com/cdn/shop/files/JiffyAssorted_535x.png?v=1682953034' },

  { name: 'Cupule Jota',
    url:  'https://www.clinicalresearchdental.com/cdn/shop/files/JiffyAssorted_535x.png?v=1682953034' },
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
