require('dotenv').config()
const mongoose = require('mongoose')
const Product = require('./models/Product')

const imageMap = [
  {
    name: 'Jet Fort 2L',
    image: 'https://mixdent.pl/1976-medium_default/occ-prosept-jet-forte-2l.jpg',
  },
  {
    name: 'Dento Viractis 95 5L',
    image: 'https://www.richadental.com/public/uploads/images/168-1582518334570cb357bfe86.jpg',
  },
  {
    name: 'Lingettes Viractis',
    image: 'https://oofti.fr/cdn/shop/products/Dento77_7526d1c9-5a9a-443e-8084-0221e727f401.jpg?v=1643377759&width=1214',
  },
  {
    name: 'Dento Viractis 52 5L',
    image: 'https://cdn2.dental-addict.be/185816-large_default/dento-viractis-instru-52-5-l.webp',
  },
  {
    name: 'Dento Viractis 53 5L',
    image: 'https://www.capdentaire.com/16583-large_default/dento-viractis-53-rtu-5l.webp',
  },
  {
    name: 'Alcool 1L',
    image: 'https://www.distributiondirectedentaire.com/wp-content/uploads/2022/07/WIN_20220711_14_40_15_Pro-600x338.jpg',
  },
  {
    name: 'Eau Oxygénée',
    image: 'https://www.dentalprive.fr/5119-large_default/eau-oxygenee-3.jpg',
  },
  {
    name: 'Hypochlorite 1L',
    image: 'https://www.go-dentaire.com/21877-large_default/hypochlorite-sodium-1l-reymerink.jpg',
  },
  {
    name: 'Bac de Stérilisation 3L',
    image: 'https://www.plateformeveterinaire.com/572-large_default/bac-de-trempage-pvc-sterilisation-a-froid-instruments-30x22cm-3l.jpg',
  },
  {
    name: 'Lubrifluid',
    image: 'https://lacroix-dentaire.fr/875-large_default/lubrifluid.jpg',
  },
  {
    name: 'Micro 10',
    image: 'https://dentalet.ma/wp-content/uploads/2023/09/micro-10-1-600x591.jpg',
  },
]

async function fix() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB connecté')

    for (const { name, image } of imageMap) {
      const res = await Product.findOneAndUpdate(
        { 'name.fr': name },
        { $set: { images: [image] } },
        { new: true }
      )
      if (res) {
        console.log(`✓ Image mise à jour : ${name}`)
      } else {
        console.log(`⚠ Produit non trouvé : ${name}`)
      }
    }

    console.log('\nTerminé.')
    process.exit(0)
  } catch (err) {
    console.error('Erreur:', err)
    process.exit(1)
  }
}

fix()
