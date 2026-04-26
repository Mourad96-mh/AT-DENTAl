require('dotenv').config()
const mongoose = require('mongoose')
const Product = require('./models/Product')

function placeholderUrl(name) {
  const text = encodeURIComponent(name.replace(/\s+/g, '+'))
  return `https://placehold.co/400x400/e8f4f8/0d3b6e?text=${text}`
}

const imageUpdates = [
  'Champs en Couleur',
  'Canules Salivaires',
  'Goblets en Couleur',
  'Casaque Stérile',
  'Seringue Insuline 29G/28mm',
  'Endo Eze',
  'Aiguille Endo UDG',
  'Charlotte',
  'Surchaussure',
  'Pochette RVG',
  'Applicateur en Couleur',
  'Pochette Lampe',
  'Bess Longue',
  'Lame de Bistouri',
  'Embouts Jaune',
  'Embouts Intraoraux',
  'Plateaux Jetables',
]

async function fix() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB connecté')

    for (const nameFr of imageUpdates) {
      const res = await Product.findOneAndUpdate(
        { 'name.fr': nameFr, images: { $size: 0 } },
        { $set: { images: [placeholderUrl(nameFr)] } },
        { new: true }
      )
      if (res) {
        console.log(`✓ Image ajoutée : ${nameFr}`)
      } else {
        console.log(`⚠ Non trouvé ou déjà avec image : ${nameFr}`)
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
