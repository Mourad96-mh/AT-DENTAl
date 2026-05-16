require('dotenv').config({ path: require('path').join(__dirname, '../.env') })
const mongoose = require('mongoose')
const cloudinary = require('cloudinary').v2
const Product = require('../models/Product')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const products = [
  {
    name: { fr: 'Panoramique Vatech', en: 'Vatech Panoramic X-ray' },
    brand: 'Vatech',
    category: 'grand-equipement',
    price: 95000,
    featured: true,
    inStock: true,
    description: {
      fr: 'Appareil panoramique numérique Vatech PaX-i, haute résolution, faible dose de rayonnement, reconstruction 3D optionnelle. Référence en imagerie dentaire panoramique au Maroc.',
      en: 'Vatech PaX-i digital panoramic unit, high resolution, low radiation dose, optional 3D reconstruction. A reference in panoramic dental imaging.',
    },
    tags: ['panoramique', 'vatech', 'radiographie', 'imagerie'],
    imageUrl: 'https://www.vatech.com/files/attach/images/292/715/002/c899297a04c5aba52b5e9a37ff4fc825.jpg',
  },
  {
    name: { fr: 'Radio Mural Castellini', en: 'Castellini Wall X-ray' },
    brand: 'Castellini',
    category: 'grand-equipement',
    price: 38000,
    featured: false,
    inStock: true,
    description: {
      fr: 'Unité radiographique murale Castellini RXDC, bras articulé 180°, capteur numérique intégré, faible émission de rayons X, idéale pour tous types de cabinets dentaires.',
      en: 'Castellini RXDC wall-mounted X-ray unit, 180° articulated arm, integrated digital sensor, low X-ray emission, ideal for all types of dental practices.',
    },
    tags: ['radiographie', 'castellini', 'mural', 'rx'],
    imageUrl: 'https://www.castellini.com/hubfs/CASTELLINI/Images/RX%20DC.jpg',
  },
  {
    name: { fr: 'Radio Mural Runyes', en: 'Runyes Wall X-ray' },
    brand: 'Runyes',
    category: 'grand-equipement',
    price: 28000,
    featured: false,
    inStock: true,
    description: {
      fr: 'Générateur radiographique mural Runyes RAY98(W), technologie DC haute fréquence, bras extensible, commande à distance, excellente qualité image pour un prix compétitif.',
      en: 'Runyes RAY98(W) wall-mounted X-ray generator, high-frequency DC technology, extendable arm, remote control, excellent image quality at a competitive price.',
    },
    tags: ['radiographie', 'runyes', 'mural', 'rx'],
    imageUrl: 'https://mydentalsupply.co.uk/cdn/shop/files/snap127_8c4c27f2-9d66-4555-aa55-b7875cf18562.jpg',
  },
  {
    name: { fr: 'Radio Portable Runyes', en: 'Runyes Portable X-ray' },
    brand: 'Runyes',
    category: 'grand-equipement',
    price: 18000,
    featured: false,
    inStock: true,
    description: {
      fr: 'Générateur radiographique portable Runyes RAY98(P), léger et maniable, batterie longue durée, idéal pour les visites à domicile et les situations d\'urgence dentaire.',
      en: 'Runyes RAY98(P) portable X-ray generator, lightweight and easy to handle, long-lasting battery, ideal for home visits and dental emergencies.',
    },
    tags: ['radiographie', 'runyes', 'portable', 'rx'],
    imageUrl: 'https://store.dentinova.co.uk/wp-content/uploads/2026/05/Portable-DC-Dental-X-ray-Machine-RAY98P-By-Runyes.png',
  },
  {
    name: { fr: 'RVG Runyes', en: 'Runyes RVG Sensor' },
    brand: 'Runyes',
    category: 'grand-equipement',
    price: 16000,
    featured: false,
    inStock: true,
    description: {
      fr: 'Capteur radiographique numérique intra-oral Runyes DR730, haute résolution CMOS, image instantanée, compatible tous logiciels dentaires, taille 1 et 2 disponibles.',
      en: 'Runyes DR730 intraoral digital X-ray sensor, high-resolution CMOS, instant image, compatible with all dental software, sizes 1 and 2 available.',
    },
    tags: ['rvg', 'runyes', 'capteur', 'numérique'],
    imageUrl: 'https://www.dentalsalemall.com/images/202308/goods_img/3250_G_1690867878805.jpg',
  },
  {
    name: { fr: 'Aspiration Runyes', en: 'Runyes Suction Unit' },
    brand: 'Runyes',
    category: 'grand-equipement',
    price: 22000,
    featured: false,
    inStock: true,
    description: {
      fr: 'Unité d\'aspiration dentaire Runyes ENROLL-01, moteur silencieux haute performance, filtration multi-étage, entretien facile, adaptée aux cabinets individuels et aux groupes.',
      en: 'Runyes ENROLL-01 dental suction unit, high-performance silent motor, multi-stage filtration, easy maintenance, suitable for solo and group practices.',
    },
    tags: ['aspiration', 'runyes', 'succion'],
    imageUrl: 'https://mydentalsupply.co.uk/cdn/shop/files/snap236.jpg?v=1700129433',
  },
  {
    name: { fr: 'Compresseur 4TEK', en: '4TEK Compressor' },
    brand: '4TEK',
    category: 'grand-equipement',
    price: 20000,
    featured: false,
    inStock: true,
    description: {
      fr: 'Compresseur dentaire 4TEK ECO4, air sec et propre, niveau sonore très faible, maintenance réduite, certifié médical. Idéal pour alimenter 1 à 2 fauteuils dentaires.',
      en: '4TEK ECO4 dental compressor, dry and clean air, very low noise level, reduced maintenance, medically certified. Ideal for powering 1 to 2 dental chairs.',
    },
    tags: ['compresseur', '4tek', 'air'],
    imageUrl: 'https://www.4-tek.it/wp-content/uploads/2023/01/4tek209-Eco4-800-400x400.jpg',
  },
  {
    name: { fr: 'Scanner Runyes', en: 'Runyes Intraoral Scanner' },
    brand: 'Runyes',
    category: 'grand-equipement',
    price: 55000,
    featured: true,
    inStock: true,
    description: {
      fr: 'Scanner intra-oral Runyes 3DS, numérisation 3D haute précision, logiciel intégré, compatible avec les flux de travail CAD/CAM, réduit le recours aux empreintes physiques.',
      en: 'Runyes 3DS intraoral scanner, high-precision 3D scanning, integrated software, compatible with CAD/CAM workflows, reduces the need for physical impressions.',
    },
    tags: ['scanner', 'runyes', 'intraoral', 'cad-cam'],
    imageUrl: 'https://www.dentalsalemall.com/images/upload/Image/Runyes%203DS%20(11).jpg',
  },
]

async function run() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('MongoDB connecté\n')

  let added = 0, skipped = 0, imgOk = 0, imgFail = 0

  for (const data of products) {
    const { imageUrl, ...productData } = data

    const exists = await Product.findOne({ 'name.fr': productData.name.fr })
    if (exists) {
      console.log(`⏭  SKIP (déjà existant): ${productData.name.fr}`)
      skipped++
      continue
    }

    // Upload image to Cloudinary first
    let images = []
    try {
      const result = await cloudinary.uploader.upload(imageUrl, { folder: 'mat-den', resource_type: 'image' })
      images = [result.secure_url]
      imgOk++
      console.log(`🖼  Image uploadée: ${productData.name.fr}`)
    } catch (err) {
      console.log(`⚠  Image échouée: ${productData.name.fr} — ${err.message}`)
      imgFail++
    }

    const product = new Product({ ...productData, images })
    await product.save()
    console.log(`✅ AJOUTÉ: ${productData.name.fr} — slug: ${product.slug}\n`)
    added++
  }

  console.log(`\nTerminé. Ajoutés: ${added}, Ignorés: ${skipped}`)
  console.log(`Images: ${imgOk} réussies, ${imgFail} échouées.`)
  await mongoose.disconnect()
}

run().catch(err => { console.error(err); process.exit(1) })
