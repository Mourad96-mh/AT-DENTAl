require('dotenv').config()
const mongoose = require('mongoose')
const Product = require('./models/Product')

const updates = [
  {
    match: { 'name.fr': 'Gant Latex Oktan' },
    set: {
      'name.fr': 'Gant Latex',
      'name.en': 'Latex Glove',
      brand: 'Sans Marque',
      'description.fr': 'Gants en latex de qualité professionnelle, disponibles en tailles XS, S, M et L.',
      'description.en': 'Professional quality latex gloves, available in sizes XS, S, M and L.',
    },
  },
  {
    match: { 'name.fr': 'Gant Nitril' },
    set: {
      'name.fr': 'Gant Nitrile Couleur',
      'name.en': 'Colored Nitrile Glove',
      'description.fr': 'Gants en nitrile sans latex, résistants aux produits chimiques. Couleurs disponibles : noir, bleu, rose. Tailles : XS, S, M, L.',
      'description.en': 'Latex-free nitrile gloves, chemical resistant. Available colors: black, blue, pink. Sizes: XS, S, M, L.',
    },
  },
  {
    match: { 'name.fr': 'Seringue Irrigation' },
    set: {
      'description.fr': "Seringue d'irrigation pour usage dentaire, embout courbe. Disponible en 1ml, 2,5ml et 5ml.",
      'description.en': 'Dental irrigation syringe with curved tip. Available in 1ml, 2.5ml and 5ml.',
    },
  },
  {
    match: { 'name.fr': 'Aiguille Dentaire Oktan' },
    set: {
      'name.fr': 'Aiguille Dentaire',
      'name.en': 'Dental Needle',
      brand: 'Sans Marque',
      'description.fr': 'Aiguilles dentaires stériles usage unique. Tailles disponibles : 12, 16, 21 et 35.',
      'description.en': 'Sterile single-use dental needles. Available sizes: 12, 16, 21 and 35.',
    },
  },
  {
    match: { 'name.fr': 'Champ Stérile Standard' },
    set: {
      'name.fr': 'Champ Stérile',
      'name.en': 'Sterile Drape',
      'description.fr': "Champ stérile pour isolation du champ opératoire, disponible en plusieurs tailles.",
      'description.en': 'Sterile drape for operative field isolation, available in multiple sizes.',
    },
  },
]

const newProducts = [
  { name: { fr: 'Champs en Couleur', en: 'Colored Drapes' }, brand: 'AT Dental', category: 'usage-unique', price: 280, images: [], description: { fr: 'Champs jetables colorés pour isolation du champ opératoire. Couleurs : violet, bleu, orange, vert, jaune, rose.', en: 'Colored disposable drapes for operative field isolation. Colors: purple, blue, orange, green, yellow, pink.' }, featured: false, inStock: true },
  { name: { fr: 'Canules Salivaires', en: 'Saliva Ejectors' }, brand: 'AT Dental', category: 'usage-unique', price: 35, images: [], description: { fr: "Canules d'aspiration salivaire usage unique, embout souple et flexible.", en: 'Single-use saliva ejector cannulas, soft and flexible tip.' }, featured: false, inStock: true },
  { name: { fr: 'Goblets en Couleur', en: 'Colored Cups' }, brand: 'AT Dental', category: 'usage-unique', price: 25, images: [], description: { fr: 'Goblets jetables colorés pour rince-bouche. Couleurs : rouge, bleu foncé, vert pistache, violet, bleu ciel.', en: 'Colored disposable rinse cups. Colors: red, dark blue, pistachio green, purple, sky blue.' }, featured: false, inStock: true },
  { name: { fr: 'Casaque Stérile', en: 'Sterile Surgical Gown' }, brand: 'AT Dental', category: 'usage-unique', price: 90, images: [], description: { fr: 'Casaque chirurgicale stérile usage unique, tissu non tissé imperméable.', en: 'Sterile single-use surgical gown, waterproof non-woven fabric.' }, featured: false, inStock: true },
  { name: { fr: 'Seringue Insuline 29G/28mm', en: 'Insulin Syringe 29G/28mm' }, brand: 'AT Dental', category: 'usage-unique', price: 30, images: [], description: { fr: 'Seringue insuline 1ml aiguille intégrée 29G 28mm, usage unique stérile.', en: '1ml insulin syringe with integrated 29G 28mm needle, sterile single-use.' }, featured: false, inStock: true },
  { name: { fr: 'Endo Eze', en: 'Endo Eze' }, brand: 'Ultradent', category: 'usage-unique', price: 120, images: [], description: { fr: "Embouts d'aspiration Endo Eze pour aspiration canalaire précise durant le traitement endodontique.", en: 'Endo Eze aspiration tips for precise canal aspiration during endodontic treatment.' }, featured: false, inStock: true },
  { name: { fr: 'Aiguille Endo UDG', en: 'UDG Endo Needle' }, brand: 'UDG', category: 'usage-unique', price: 55, images: [], description: { fr: 'Aiguilles endodontiques UDG à embout latéral pour irrigation canalaire précise.', en: 'UDG endodontic needles with lateral tip for precise canal irrigation.' }, featured: false, inStock: true },
  { name: { fr: 'Charlotte', en: 'Disposable Hair Net' }, brand: 'AT Dental', category: 'usage-unique', price: 20, images: [], description: { fr: 'Charlottes de protection jetables, élastiquées, confortables pour équipe soignante.', en: 'Disposable protective hair nets, elasticated, comfortable for dental team.' }, featured: false, inStock: true },
  { name: { fr: 'Surchaussure', en: 'Shoe Cover' }, brand: 'AT Dental', category: 'usage-unique', price: 15, images: [], description: { fr: 'Surchaussures jetables de protection antiglisse pour cabinet dentaire.', en: 'Disposable non-slip protective shoe covers for dental office.' }, featured: false, inStock: true },
  { name: { fr: 'Pochette RVG', en: 'RVG Sensor Cover' }, brand: 'AT Dental', category: 'usage-unique', price: 40, images: [], description: { fr: "Housses de protection usage unique pour capteurs RVG, garantissent l'hygiène de la radiographie numérique.", en: 'Single-use protective covers for RVG sensors, ensuring hygiene in digital radiography.' }, featured: false, inStock: true },
  { name: { fr: 'Applicateur en Couleur', en: 'Colored Microbrush' }, brand: 'AT Dental', category: 'usage-unique', price: 30, images: [], description: { fr: 'Microbrush applicateurs colorés usage unique. Couleurs : rose, bleu, vert, jaune, blanc.', en: 'Colored single-use microbrush applicators. Colors: pink, blue, green, yellow, white.' }, featured: false, inStock: true },
  { name: { fr: 'Pochette Lampe', en: 'Light Handle Cover' }, brand: 'AT Dental', category: 'usage-unique', price: 35, images: [], description: { fr: 'Housses de protection usage unique pour lampe scialytique ou lampe opératoire.', en: 'Single-use protective covers for operating or dental light handles.' }, featured: false, inStock: true },
  { name: { fr: 'Bess Longue', en: 'Long Cotton Roll' }, brand: 'AT Dental', category: 'usage-unique', price: 45, images: [], description: { fr: 'Rouleaux de coton Bess longue format pour isolation et absorption, usage unique.', en: 'Long format Bess cotton rolls for isolation and absorption, single-use.' }, featured: false, inStock: true },
  { name: { fr: 'Lame de Bistouri', en: 'Scalpel Blade' }, brand: 'AT Dental', category: 'usage-unique', price: 25, images: [], description: { fr: 'Lames de bistouri chirurgicales stériles usage unique, disponibles en tailles 11, 15 et 15C.', en: 'Sterile single-use surgical scalpel blades, available in sizes 11, 15 and 15C.' }, featured: false, inStock: true },
  { name: { fr: 'Embouts Jaune', en: 'Yellow Saliva Ejector Tips' }, brand: 'AT Dental', category: 'usage-unique', price: 20, images: [], description: { fr: "Embouts jaunes d'aspiration salivaire usage unique, flexibles et résistants.", en: 'Yellow single-use saliva ejector tips, flexible and durable.' }, featured: false, inStock: true },
  { name: { fr: 'Embouts Intraoraux', en: 'Intraoral Tips' }, brand: 'AT Dental', category: 'usage-unique', price: 25, images: [], description: { fr: "Embouts intraoraux usage unique pour seringue air/eau, garantissent l'hygiène inter-patients.", en: 'Single-use intraoral tips for air/water syringes, ensuring inter-patient hygiene.' }, featured: false, inStock: true },
  { name: { fr: 'Plateaux Jetables', en: 'Disposable Trays' }, brand: 'AT Dental', category: 'usage-unique', price: 60, images: [], description: { fr: "Plateaux d'instruments jetables en plastique rigide, usage unique, disponibles en plusieurs couleurs.", en: 'Rigid plastic disposable instrument trays, single-use, available in multiple colors.' }, featured: false, inStock: true },
]

async function migrate() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB connecté')

    // 1. Update existing products
    for (const { match, set } of updates) {
      const res = await Product.findOneAndUpdate(match, { $set: set }, { new: true })
      if (res) {
        console.log(`✓ Mis à jour : ${res.name.fr}`)
      } else {
        console.log(`⚠ Non trouvé : ${JSON.stringify(match)}`)
      }
    }

    // 2. Insert new products (skip duplicates)
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
