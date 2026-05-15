require('dotenv').config({ path: require('path').join(__dirname, '../.env') })
const mongoose = require('mongoose')
const Product = require('../models/Product')

const newProducts = [
  // ── INSTRUMENTATION — Instruments Falcon ─────────────────────
  {
    name: { fr: 'Spatule de Bouche', en: 'Mouth Spatula' },
    brand: 'Falcon', category: 'instrumentation', price: 120,
    description: {
      fr: 'Spatule de bouche Falcon flexible en acier inoxydable, pour manipulation et insertion des composites en bouche.',
      en: 'Falcon flexible stainless steel mouth spatula for manipulation and insertion of composites intraorally.',
    },
  },
  {
    name: { fr: 'Spatule à Ciment', en: 'Cement Spatula' },
    brand: 'Falcon', category: 'instrumentation', price: 130,
    description: {
      fr: 'Spatules à ciment Falcon en acier inoxydable, pour malaxage des ciments et liners, différentes formes d\'extrémités.',
      en: 'Falcon stainless steel cement spatulas for mixing cements and liners, various tip shapes.',
    },
  },
  {
    name: { fr: 'Burnissoir', en: 'Burnisher' },
    brand: 'Falcon', category: 'instrumentation', price: 140,
    description: {
      fr: 'Burnissoirs Falcon pour condensation et adaptation des amalgames et composites, extrémités ball ou discoid-cleoid.',
      en: 'Falcon burnishers for condensation and adaptation of amalgams and composites, ball or discoid-cleoid tips.',
    },
  },
  {
    name: { fr: 'Curette', en: 'Curette' },
    brand: 'Falcon', category: 'instrumentation', price: 160,
    description: {
      fr: 'Curette dentaire Falcon universelle ou de Gracey, acier inoxydable, pour détartrage sous-gingival et surfaçage radiculaire.',
      en: 'Falcon universal or Gracey dental curette, stainless steel, for subgingival scaling and root planing.',
    },
  },
  {
    name: { fr: 'Décolleur', en: 'Periosteal Elevator' },
    brand: 'Falcon', category: 'instrumentation', price: 150,
    description: {
      fr: 'Décolleur périosté Falcon en acier inoxydable, pour décoller les tissus gingivaux et osseux lors des actes chirurgicaux.',
      en: 'Falcon stainless steel periosteal elevator for separating gingival and bone tissues during surgical procedures.',
    },
  },
  {
    name: { fr: 'Sonde Dentaire', en: 'Dental Probe' },
    brand: 'Falcon', category: 'instrumentation', price: 120,
    description: {
      fr: 'Sonde dentaire Falcon à crochet double en acier inoxydable, pour exploration canalaire et détection des caries.',
      en: 'Falcon double-ended stainless steel dental probe for canal exploration and caries detection.',
    },
  },

  // ── FRAISE & POLISSAGE — AT Dental ───────────────────────────
  {
    name: { fr: 'Diamond Excel', en: 'Diamond Excel' },
    brand: 'AT Dental', category: 'fraise', price: 480,
    description: {
      fr: 'Pâte de polissage Diamond Excel AT Dental, formule abrasive graduée pour finition et brillance durable des restaurations composites.',
      en: 'AT Dental Diamond Excel polishing paste, graduated abrasive formula for lasting finish and shine on composite restorations.',
    },
  },

  // ── RESTAURATION — Composites Bisco ──────────────────────────
  {
    name: { fr: 'Bulk Fill', en: 'Bulk Fill' },
    brand: 'Bisco', category: 'restauration', price: 320,
    description: {
      fr: 'Composite Bisco Bulk Fill, polymérisation en couche unique jusqu\'à 5mm, retrait de polymérisation réduit.',
      en: 'Bisco Bulk Fill composite, single layer polymerization up to 5mm, reduced polymerization shrinkage.',
    },
  },
]

async function run() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('MongoDB connecté')

  let inserted = 0
  let skipped = 0

  for (const p of newProducts) {
    const slug = p.name.fr
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      + '-' + p.brand.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')

    const exists = await Product.findOne({ slug })
    if (exists) {
      console.log(`  SKIP (existe déjà): ${p.name.fr} [${slug}]`)
      skipped++
      continue
    }

    await Product.create({ ...p, slug, inStock: true, featured: false, images: [], tags: [] })
    console.log(`  + Créé: ${p.name.fr} (${p.brand}) [${slug}]`)
    inserted++
  }

  console.log(`\nTerminé — ${inserted} produits créés, ${skipped} ignorés.`)
  await mongoose.disconnect()
}

run().catch((err) => { console.error(err); process.exit(1) })
