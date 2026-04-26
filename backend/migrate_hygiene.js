require('dotenv').config()
const mongoose = require('mongoose')
const Product = require('./models/Product')

function placeholderUrl(name) {
  const text = encodeURIComponent(name.replace(/\s+/g, '+'))
  return `https://placehold.co/400x400/e8f4f8/0d3b6e?text=${text}`
}

const updates = [
  {
    match: { 'name.fr': 'Lingettes DCC' },
    set: {
      'name.fr': 'Lingettes OCC',
      'name.en': 'OCC Wipes',
      brand: 'OCC',
      'description.fr': 'Lingettes désinfectantes pour surfaces, usage rapide.',
      'description.en': 'Disinfecting surface wipes, quick use.',
    },
  },
  {
    match: { 'name.fr': 'Dento Viractis 77' },
    set: {
      'description.fr': 'Désinfectant de haut niveau pour surfaces dentaires.',
      'description.en': 'High-level disinfectant for dental surfaces.',
    },
  },
  {
    match: { 'name.fr': 'Rouleaux Stérilisation N°7.5' },
    set: {
      'name.fr': 'Rouleaux Stérilisation',
      'name.en': 'Sterilization Rolls',
      'description.fr': 'Rouleaux de stérilisation thermosoudés, norme EN868. Tailles disponibles : 5, 7,5, 10, 15, 20, 25 et 30 cm.',
      'description.en': 'Heat-sealed sterilization rolls, EN868 standard. Available sizes: 5, 7.5, 10, 15, 20, 25 and 30 cm.',
    },
  },
  {
    match: { 'name.fr': 'Prosept Spray' },
    set: {
      'description.fr': "Spray désinfectant prêt à l'emploi pour surfaces et empreintes. Disponible en 1L et 5L.",
      'description.en': 'Ready-to-use disinfectant spray for surfaces and impressions. Available in 1L and 5L.',
    },
  },
  {
    match: { 'name.fr': 'Pack Stérilisation' },
    set: {
      'description.fr': 'Vendu à la pièce : autoclave, soudeuse ou distilateur. Équipement de stérilisation professionnel.',
      'description.en': 'Sold individually: autoclave, sealer or distiller. Professional sterilization equipment.',
    },
  },
  {
    match: { 'name.fr': 'Prosept Fortis' },
    set: {
      'description.fr': 'Désinfectant concentré pour instruments et surfaces dentaires. Disponible en 1L et 5L.',
      'description.en': 'Concentrated disinfectant for dental instruments and surfaces. Available in 1L and 5L.',
    },
  },
]

const newProducts = [
  { name: { fr: 'Jet Fort 2L', en: 'Jet Fort 2L' }, brand: 'Jet Fort', category: 'hygiene', price: 120, images: [placeholderUrl('Jet Fort 2L')], description: { fr: 'Désinfectant puissant multi-surfaces pour cabinet dentaire, flacon 2L.', en: 'Powerful multi-surface disinfectant for dental office, 2L bottle.' }, featured: false, inStock: true },
  { name: { fr: 'Dento Viractis 95 5L', en: 'Dento Viractis 95 5L' }, brand: 'Viractis', category: 'hygiene', price: 650, images: [placeholderUrl('Dento+Viractis+95')], description: { fr: 'Désinfectant Dento Viractis 95 pour surfaces dentaires, bidon 5L.', en: 'Dento Viractis 95 surface disinfectant for dental use, 5L container.' }, featured: false, inStock: true },
  { name: { fr: 'Lingettes Viractis', en: 'Viractis Wipes' }, brand: 'Viractis', category: 'hygiene', price: 80, images: [placeholderUrl('Lingettes+Viractis')], description: { fr: 'Lingettes désinfectantes Viractis pour surfaces, efficacité virucide et bactéricide.', en: 'Viractis disinfecting wipes for surfaces, virucidal and bactericidal efficacy.' }, featured: false, inStock: true },
  { name: { fr: 'Dento Viractis 52 5L', en: 'Dento Viractis 52 5L' }, brand: 'Viractis', category: 'hygiene', price: 580, images: [placeholderUrl('Dento+Viractis+52')], description: { fr: 'Désinfectant Dento Viractis 52 pour surfaces dentaires, bidon 5L.', en: 'Dento Viractis 52 surface disinfectant for dental use, 5L container.' }, featured: false, inStock: true },
  { name: { fr: 'Dento Viractis 53 5L', en: 'Dento Viractis 53 5L' }, brand: 'Viractis', category: 'hygiene', price: 600, images: [placeholderUrl('Dento+Viractis+53')], description: { fr: 'Désinfectant Dento Viractis 53 pour surfaces dentaires, bidon 5L.', en: 'Dento Viractis 53 surface disinfectant for dental use, 5L container.' }, featured: false, inStock: true },
  { name: { fr: 'Alcool 1L', en: 'Alcohol 1L' }, brand: 'AT Dental', category: 'hygiene', price: 45, images: [placeholderUrl('Alcool+1L')], description: { fr: 'Alcool isopropylique ou éthylique 70°/90° pour désinfection rapide des surfaces, flacon 1L.', en: 'Isopropyl or ethyl alcohol 70°/90° for rapid surface disinfection, 1L bottle.' }, featured: false, inStock: true },
  { name: { fr: 'Eau Oxygénée', en: 'Hydrogen Peroxide' }, brand: 'AT Dental', category: 'hygiene', price: 30, images: [placeholderUrl('Eau+Oxygenee')], description: { fr: "Eau oxygénée 3% à 30% pour désinfection et décontamination en cabinet dentaire.", en: 'Hydrogen peroxide 3% to 30% for disinfection and decontamination in dental practice.' }, featured: false, inStock: true },
  { name: { fr: 'Hypochlorite 1L', en: 'Hypochlorite 1L' }, brand: 'AT Dental', category: 'hygiene', price: 35, images: [placeholderUrl('Hypochlorite+1L')], description: { fr: "Hypochlorite de sodium pour irrigation canalaire et désinfection, flacon 1L.", en: 'Sodium hypochlorite for canal irrigation and disinfection, 1L bottle.' }, featured: false, inStock: true },
  { name: { fr: 'Bac de Stérilisation 3L', en: 'Sterilization Tray 3L' }, brand: 'AT Dental', category: 'hygiene', price: 150, images: [placeholderUrl('Bac+Sterilisation+3L')], description: { fr: 'Bac de stérilisation chimique à froid 3L avec couvercle, pour instruments dentaires.', en: 'Cold chemical sterilization tray 3L with lid, for dental instruments.' }, featured: false, inStock: true },
  { name: { fr: 'Lubrifluid', en: 'Lubrifluid' }, brand: 'AT Dental', category: 'hygiene', price: 90, images: [placeholderUrl('Lubrifluid')], description: { fr: 'Lubrifiant fluide pour pièces à main et contre-angles, maintenance et protection.', en: 'Fluid lubricant for handpieces and contra-angles, maintenance and protection.' }, featured: false, inStock: true },
  { name: { fr: 'Micro 10', en: 'Micro 10' }, brand: 'AT Dental', category: 'hygiene', price: 180, images: [placeholderUrl('Micro+10')], description: { fr: 'Détergent désinfectant enzymatique Micro 10 pour instruments dentaires. Disponible en 1L et 5L.', en: 'Micro 10 enzymatic detergent disinfectant for dental instruments. Available in 1L and 5L.' }, featured: false, inStock: true },
]

async function migrate() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB connecté')

    for (const { match, set } of updates) {
      const res = await Product.findOneAndUpdate(match, { $set: set }, { new: true })
      if (res) {
        console.log(`✓ Mis à jour : ${res.name.fr}`)
      } else {
        console.log(`⚠ Non trouvé : ${JSON.stringify(match)}`)
      }
    }

    let inserted = 0
    for (const p of newProducts) {
      const exists = await Product.exists({ 'name.fr': p.name.fr })
      if (exists) {
        console.log(`⚠ Déjà existant, ignoré : ${p.name.fr}`)
        continue
      }
      await Product.create(p)
      console.log(`✓ Inséré : ${p.name.fr}`)
      inserted++
    }

    console.log(`\nMigration terminée — ${inserted} produit(s) ajouté(s), ${updates.length} mis à jour.`)
    process.exit(0)
  } catch (err) {
    console.error('Erreur migration:', err)
    process.exit(1)
  }
}

migrate()
