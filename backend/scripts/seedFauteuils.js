require('dotenv').config({ path: require('path').join(__dirname, '../.env') })
const mongoose = require('mongoose')
const Product = require('../models/Product')

const fauteuils = [
  {
    name: { fr: 'Castellini Puma Eli', en: 'Castellini Puma Eli' },
    brand: 'Castellini',
    category: 'fauteuils',
    price: 55000,
    featured: false,
    inStock: true,
    description: {
      fr: 'Fauteuil dentaire Castellini Puma Eli, design ergonomique italien, assise confortable, commandes électroniques intuitives. Idéal pour les cabinets souhaitant allier performance et esthétique.',
      en: 'Castellini Puma Eli dental chair, ergonomic Italian design, comfortable seat, intuitive electronic controls. Ideal for practices combining performance and aesthetics.',
    },
    tags: ['fauteuil', 'castellini', 'puma', 'eli'],
  },
  {
    name: { fr: 'Castellini Skyma 5', en: 'Castellini Skyma 5' },
    brand: 'Castellini',
    category: 'fauteuils',
    price: 70000,
    featured: false,
    inStock: true,
    description: {
      fr: 'Fauteuil dentaire Castellini Skyma 5, gamme premium italienne, système de commande électronique avancé, positions programmables, plateau 5 instruments. Confort patient et praticien optimaux.',
      en: 'Castellini Skyma 5 dental chair, premium Italian range, advanced electronic control system, programmable positions, 5-instrument tray. Optimal patient and practitioner comfort.',
    },
    tags: ['fauteuil', 'castellini', 'skyma', 'premium'],
  },
  {
    name: { fr: 'Castellini Skyma 6', en: 'Castellini Skyma 6' },
    brand: 'Castellini',
    category: 'fauteuils',
    price: 85000,
    featured: true,
    inStock: true,
    description: {
      fr: 'Fauteuil dentaire Castellini Skyma 6, haut de gamme italien, plateau 6 instruments, éclairage LED intégré, mémoire de positions, finitions soignées. Le summum du confort en cabinet dentaire.',
      en: 'Castellini Skyma 6 dental chair, Italian top-of-the-range, 6-instrument tray, integrated LED lighting, position memory, premium finish. The ultimate in dental practice comfort.',
    },
    tags: ['fauteuil', 'castellini', 'skyma', 'haut-de-gamme'],
  },
  {
    name: { fr: 'Stern Weber S200', en: 'Stern Weber S200' },
    brand: 'Stern Weber',
    category: 'fauteuils',
    price: 45000,
    featured: false,
    inStock: true,
    description: {
      fr: 'Fauteuil dentaire Stern Weber S200, fiabilité italienne, conception ergonomique, commandes au pied, tablette 3 instruments. Entrée de gamme robuste pour cabinets exigeants.',
      en: 'Stern Weber S200 dental chair, Italian reliability, ergonomic design, foot controls, 3-instrument tray. Sturdy entry-level option for demanding practices.',
    },
    tags: ['fauteuil', 'stern-weber', 's200'],
  },
  {
    name: { fr: 'Stern Weber S220 TR', en: 'Stern Weber S220 TR' },
    brand: 'Stern Weber',
    category: 'fauteuils',
    price: 55000,
    featured: false,
    inStock: true,
    description: {
      fr: 'Fauteuil dentaire Stern Weber S220 TR, transmission par courroie, tablette 3 instruments, commandes électroniques, assise rembourrée haute résistance. Polyvalence et confort au quotidien.',
      en: 'Stern Weber S220 TR dental chair, belt transmission, 3-instrument tray, electronic controls, high-resistance padded seat. Versatility and daily comfort.',
    },
    tags: ['fauteuil', 'stern-weber', 's220'],
  },
  {
    name: { fr: 'Stern Weber S300', en: 'Stern Weber S300' },
    brand: 'Stern Weber',
    category: 'fauteuils',
    price: 65000,
    featured: false,
    inStock: true,
    description: {
      fr: 'Fauteuil dentaire Stern Weber S300, gamme intermédiaire italienne, positions programmables, tablette 3 instruments, crachoir intégré, ergonomie praticien avancée.',
      en: 'Stern Weber S300 dental chair, Italian mid-range, programmable positions, 3-instrument tray, integrated cuspidor, advanced practitioner ergonomics.',
    },
    tags: ['fauteuil', 'stern-weber', 's300'],
  },
  {
    name: { fr: 'Stern Weber S380 TRC', en: 'Stern Weber S380 TRC' },
    brand: 'Stern Weber',
    category: 'fauteuils',
    price: 80000,
    featured: true,
    inStock: true,
    description: {
      fr: 'Fauteuil dentaire Stern Weber S380 TRC, haut de gamme, transmission par câble, positions multiples mémorisées, plateau 5 instruments, éclairage LED scialytique, esthétique soignée.',
      en: 'Stern Weber S380 TRC dental chair, top-of-the-range, cable transmission, multiple memorized positions, 5-instrument tray, LED scialytic light, premium finish.',
    },
    tags: ['fauteuil', 'stern-weber', 's380', 'haut-de-gamme'],
  },
  {
    name: { fr: 'Runyes Care 11', en: 'Runyes Care 11' },
    brand: 'Runyes',
    category: 'fauteuils',
    price: 30000,
    featured: false,
    inStock: true,
    description: {
      fr: 'Fauteuil dentaire Runyes Care 11, conception compacte, commandes électroniques simples, tablette 3 instruments, excellent rapport qualité-prix pour les nouveaux cabinets.',
      en: 'Runyes Care 11 dental chair, compact design, simple electronic controls, 3-instrument tray, excellent value for money for new practices.',
    },
    tags: ['fauteuil', 'runyes', 'care-11'],
  },
  {
    name: { fr: 'Runyes Care 22', en: 'Runyes Care 22' },
    brand: 'Runyes',
    category: 'fauteuils',
    price: 40000,
    featured: false,
    inStock: true,
    description: {
      fr: 'Fauteuil dentaire Runyes Care 22, ergonomie améliorée, positions électriques programmables, tablette 3 instruments, crachoir, éclairage LED. Polyvalent et économique.',
      en: 'Runyes Care 22 dental chair, improved ergonomics, programmable electric positions, 3-instrument tray, cuspidor, LED lighting. Versatile and economical.',
    },
    tags: ['fauteuil', 'runyes', 'care-22'],
  },
  {
    name: { fr: 'Runyes Care 33 F', en: 'Runyes Care 33 F' },
    brand: 'Runyes',
    category: 'fauteuils',
    price: 50000,
    featured: false,
    inStock: true,
    description: {
      fr: 'Fauteuil dentaire Runyes Care 33 F, gamme supérieure, transmission par câble, 4 positions mémorisées, tablette 5 instruments, éclairage LED intégré, revêtement cuir synthétique premium.',
      en: 'Runyes Care 33 F dental chair, upper range, cable transmission, 4 memorized positions, 5-instrument tray, integrated LED lighting, premium synthetic leather upholstery.',
    },
    tags: ['fauteuil', 'runyes', 'care-33'],
  },
]

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('Connected to MongoDB')

  let added = 0
  let skipped = 0

  for (const data of fauteuils) {
    const exists = await Product.findOne({ 'name.fr': data.name.fr })
    if (exists) {
      console.log(`⏭  SKIP: ${data.name.fr}`)
      skipped++
      continue
    }
    const product = new Product(data)
    await product.save()
    console.log(`✅ ADDED: ${data.name.fr} — slug: ${product.slug}`)
    added++
  }

  console.log(`\nDone. Added: ${added}, Skipped: ${skipped}`)
  await mongoose.disconnect()
}

seed().catch((err) => { console.error(err); process.exit(1) })
