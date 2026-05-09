require('dotenv').config({ path: require('path').join(__dirname, '../.env') })
const mongoose = require('mongoose')
const cloudinary = require('cloudinary').v2
const Product = require('../models/Product')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const imageMap = [
  // Blanchiment
  { name: 'Jet Fort 2L',                  image: 'https://dentaleshop.pl/environment/cache/images/productGfx_97cd0d57fd7c311751dff5efc9a77f98_500_500.jpg' },
  { name: 'Power Whitening 2 Patients',   image: 'https://www.dentrealstore.com/cdn/shop/files/fgm-whiteness-hp-whitening-campaign-in-office-dental-whitening-980708.jpg?v=1733146842&width=1200' },
  { name: 'Lampe COXO',                   image: 'https://storage.googleapis.com/drive.dentacarts.com/public/products/259/25948_1.jpg' },
  { name: 'Lampe Blanchiment sans Support', image: 'https://abritedental.com/cdn/shop/products/md666.jpg?v=1658973704&width=3840' },

  // Endodontie — Micro Mega
  { name: 'Revo S+',                      image: 'https://www.moayaddentalsupplies.com/image/cache/catalog/burs%20+%20fill/fill/WhatsApp%20Image%202021-05-11%20at%2011.32.45%20AM-550x550w.jpeg' },
  { name: 'R-Endo R1/R2/R3',             image: 'https://www.dentalaaka.com/uploaded_files/products/micro-mega-r-endo-2.jpg' },
  { name: 'Revo Spreader',                image: 'https://ik.imagekit.io/z6mqjyyzz/media/public/74c5f7afa74a4027b_Revo-Spreader_1.jpg' },

  // Endodontie — Prevest / Meta Biomed
  { name: 'Carven',                        image: 'https://www.dentganga.com/storage/images/product/main_image/carevene1679727938.jpg' },
  { name: 'Biner LC',                      image: 'https://dentalprod.com/cdn/shop/products/binerlc.jpg?v=1624444615' },
  { name: 'Metapex+',                      image: 'https://daantwale.com/cdn/shop/files/metapex_plus_edit-min.jpg?v=1736423527&width=1080' },
  { name: 'Calplus',                        image: 'https://dentalprod.com/cdn/shop/products/PrevestDenproCalplusCalciumHydroxidePaste.jpg?v=1603965031' },
  { name: 'Dolo Endo Gel',                 image: 'https://r2dkmedia.dentalkart.com/media/catalog/product/d/o/dolo_edta_gel.jpg' },
  { name: 'MD Cleanser',                   image: 'https://dentalcity.com/CatalogImages/DENLN/18-14556-Product_Primary_Image-400X400.jpg' },
  { name: 'MD Chelcream',                  image: 'https://storage.googleapis.com/drive.dentacarts.com/public/products/60/6007_1.jpg' },

  // Ciment / Restauration
  { name: 'Ketac Molar',                   image: 'https://amplemeds.com/cdn/shop/files/3mketacmolarr32.jpg?v=1757499422&width=1946' },
  { name: 'I Fil',                          image: 'https://premiumplus.s3.eu-west-1.amazonaws.com/wp-content/uploads/2018/09/i-fil-600x600.jpg' },
  { name: 'Relyx Temp',                    image: 'https://www.dentalcity.com/CatalogImages/DENLN/18-227-Product_Primary_Image-400X400.jpg' },
  { name: 'Provitemp',                     image: 'https://www.dentalsky.com/media/catalog/product/cache/f85fa63785494855da584f973c145c72/p/r/provitemp-5ml-automix-syringe-kit-7ee_1.jpg' },
  { name: 'Dentotemp',                     image: 'https://www.skydentalsupply.com/picts/products/tnw800-dentotemp.webp' },
  { name: 'Cavitemp',                      image: 'https://r2dkmedia.dentalkart.com/media/catalog/product/c/a/cavitemp1.jpg' },
  { name: 'Provis',                         image: 'https://cdn11.bigcommerce.com/s-emp9gstccl/images/stencil/1280x1280/products/4735/4734/VIV-T001__28141.1612397164.jpg?c=2' },
  { name: 'Pulpodent',                     image: 'https://www.dentalcity.com/CatalogImages/DENLN/18-10655-Product_Primary_Image-400X400.jpg' },
]

async function run() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('MongoDB connecté\n')

  let ok = 0, fail = 0

  for (const { name, image } of imageMap) {
    try {
      const result = await cloudinary.uploader.upload(image, {
        folder: 'mat-den',
        resource_type: 'image',
      })
      await Product.findOneAndUpdate(
        { 'name.fr': name },
        { $set: { images: [result.secure_url] } }
      )
      console.log(`✓ ${name}`)
      ok++
    } catch (err) {
      console.log(`✗ ${name} — ${err.message}`)
      fail++
    }
  }

  console.log(`\nTerminé. ${ok} uploadés, ${fail} échoués.`)
  await mongoose.disconnect()
}

run().catch(err => { console.error(err); process.exit(1) })
