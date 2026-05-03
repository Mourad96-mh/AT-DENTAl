require('dotenv').config({ path: require('path').join(__dirname, '../.env') })
const mongoose = require('mongoose')
const Product = require('../models/Product')

const imageMap = [
  // ── EMPREINTE ──────────���──────────────────────────────────────
  {
    name: 'Kit Silaxil',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/silaxil-putty-silicona-condensacion.png?itok=DIrSOTh2',
  },
  {
    name: 'Élite HD Putty et Light',
    image: 'https://www.go-dentaire.com/19200-large_default/elite-hd-zhermack-silicone-addition-dentiste.jpg',
  },
  {
    name: 'Panasil Putty et Light',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/panasil-putty-fast-material-de-impresion-2-uds-200-ml-kettenbach.jpg?itok=fJ0C-Lz2',
  },
  {
    name: 'Traxodent',
    image: 'https://www.premierdentalco.com/wp-content/uploads/2018/09/traxodent-9007093_starter-pack_2023-700x467.jpg',
  },

  // ── BLANCHIMENT ────────────────────────────────��──────────────
  {
    name: 'Flash 2 Patients',
    image: 'https://www.optimadents.com/wp-content/uploads/2021/04/7.jpg',
  },
  {
    name: 'Whitness HP Rouge',
    image: 'https://fgmdentalgroup.com/wp-content/uploads/2022/11/Whiteness-HP.png',
  },
  {
    name: 'Opalustre',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/opalustre-reposiciones.jpg?itok=3V-pjJJX',
  },
  {
    name: 'Nite White 16%/22%',
    image: 'https://dentalhealth.com/cdn/shop/products/zoom_nite_white_22.jpg?v=1673013416&width=1080',
  },
  {
    name: 'Beyond',
    image: 'https://beyonddent.com/wp-content/uploads/slider2/beyondii-ultra.png',
  },
  {
    name: 'Lampe Zoom avec 5 Coffrets Blanchiment',
    image: 'https://www.dentrealstore.com/cdn/shop/files/zoom-whitespeed-chairside-kit-in-office-dental-whitening-system-two-patient-770938.png?v=1733214655&width=1200',
  },
  {
    name: 'Lampe de Blanchiment Wood',
    image: 'https://www.dentalworldofficial.com/wp-content/uploads/2020/01/e8d446_20d7d4a739da49cf9778861021e565f1mv2-600x600.jpg',
  },

  // ── ENDODONTIE ────────────────────────────────────────────────
  {
    name: 'Lime iRace',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/irace-plus-21.jpg?itok=5mn3mExC',
  },
  {
    name: 'Theracal LC',
    image: 'https://cdn11.bigcommerce.com/s-4xfcjqmnan/images/stencil/1280x1280/products/448/497/bisco_dental_products_calcium__0002_TheraCalLC_4_Pack_Syringe_with_Box__74386.1754489288.jpg?c=1',
  },

  // ── CIMENT ────────────────────────────────────────────────────
  {
    name: 'Meron',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/meron-definitive-cement-powder-35gr-liquid-15ml.jpg?itok=GDTrldrt',
  },
]

async function fix() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('MongoDB connecté')

  for (const { name, image } of imageMap) {
    const res = await Product.findOneAndUpdate(
      { 'name.fr': name },
      { $set: { images: [image] } },
      { new: true }
    )
    if (res) {
      console.log(`✓ ${name}`)
    } else {
      console.log(`⚠ Non trouvé : ${name}`)
    }
  }

  console.log('\nTerminé.')
  await mongoose.disconnect()
}

fix().catch(err => { console.error(err); process.exit(1) })
