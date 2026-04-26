require('dotenv').config()
const mongoose = require('mongoose')
const Product = require('./models/Product')

const imageMap = [
  {
    name: 'Champs en Couleur',
    image: 'https://www.go-dentaire.com/21865-large_default/steri-quick-champs-steriles-671101-coltene.jpg',
  },
  {
    name: 'Canules Salivaires',
    image: 'https://dentalachat.com/718-medium_default/canules-surgitip-roeko.jpg',
  },
  {
    name: 'Goblets en Couleur',
    image: 'https://dentalachat.com/3490-medium_default/gobelets-en-polystyrene-dentalica-trend.jpg',
  },
  {
    name: 'Casaque Stérile',
    image: 'https://dentalachat.com/1904-medium_default/casaques-chirurgicales-steriles-bleues-le-lot-de-40-medistock.jpg',
  },
  {
    name: 'Seringue Insuline 29G/28mm',
    image: 'https://www.pharma-gdd.com/media/cache/resolve/product_show/euromedis-seringue-insuline-avec-aiguille-29-g-option.jpg',
  },
  {
    name: 'Endo Eze',
    image: 'https://www.clinicalresearchdental.com/cdn/shop/products/Ultradent_Endo-Eze-Tips-22ga-20ga-19ga-18ga-group_535x.jpg?v=1629479341',
  },
  {
    name: 'Aiguille Endo UDG',
    image: 'https://bondent.eu/wp-content/uploads/2022/02/0221-01.jpg',
  },
  {
    name: 'Charlotte',
    image: 'https://dentalachat.com/1899-medium_default/calots-bleus-avec-lacets-reglables-en-tnt-euronda.jpg',
  },
  {
    name: 'Surchaussure',
    image: 'https://dentaire.eurobytech.com/wp-content/uploads/2020/06/Surchaussures.jpg',
  },
  {
    name: 'Pochette RVG',
    image: 'https://www.go-dentaire.com/1483-large_default/housse-protection-capteur-erlm-satelec-acteon-materiel-dentaire-France.jpg',
  },
  {
    name: 'Applicateur en Couleur',
    image: 'https://www.capdentaire.com/14632-large_default/applicateurs-plus-microbrush.webp',
  },
  {
    name: 'Pochette Lampe',
    image: 'https://www.cgmedical.fr/wp-content/uploads/2022/03/manchon-sterile-bloc-operatoire-1.jpg',
  },
  {
    name: 'Bess Longue',
    image: 'https://www.go-dentaire.com/23561-large_default/rouleaux-salivaires-n3-septaline-dentaire.jpg',
  },
  {
    name: 'Lame de Bistouri',
    image: 'https://www.go-dentaire.com/19446-large_default/swann-morton-bistouris-jetables-lame-11.jpg',
  },
  {
    name: 'Embouts Jaune',
    image: 'https://www.capdentaire.com/15480-large_default/embouts-intra-oraux-jaunes-medibase100-le-lot-de-100-embouts-jaunes-medibase.webp',
  },
  {
    name: 'Embouts Intraoraux',
    image: 'https://dentalachat.com/550-medium_default/embouts-intra-oraux-par-100-medistock.jpg',
  },
  {
    name: 'Plateaux Jetables',
    image: 'https://dentalachat.com/3381-medium_default/plateaux-jetables-compartimentes-stries-smart.jpg',
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
