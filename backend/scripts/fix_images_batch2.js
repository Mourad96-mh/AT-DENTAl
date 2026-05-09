require('dotenv').config({ path: require('path').join(__dirname, '../.env') })
const mongoose = require('mongoose')
const Product = require('../models/Product')

const imageMap = [
  // ── EMPREINTE ─────────────────────────────────────────────────
  {
    name: 'Kit Durosil',
    image: 'https://storage.googleapis.com/drive.dentacarts.com/public/products/227/22719_1.jpg',
  },
  {
    name: 'Kit Dent Plus',
    image: 'https://lacentraledentaire.ma/wp-content/uploads/2025/05/dentplus.jpg',
  },
  {
    name: 'Express Putty et Light',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/express-2-putty-quick_0.jpg',
  },
  {
    name: 'Hydrorise Putty et Light',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/th3_hydrorise-putty_0_1.jpg',
  },
  {
    name: 'Hemostal Gel',
    image: 'https://www.prevestdenpro.com/wp-content/uploads/2021/08/Hemostal-Gel-min.jpg',
  },
  {
    name: 'Astringent 3M',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/pasta-astringente-3m-1.jpg',
  },
  {
    name: 'Porte Empreinte Métal/Plastique',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/dtx-vi62530-cubetas-metal.png',
  },

  // ── BLANCHIMENT ───────────────────────────────────────────────
  {
    name: 'Lampe de Blanchiment Wood',
    image: 'https://www.dentalsalemall.com/images/202101/goods_img/2453_G_1610964738756.jpg',
  },
  {
    name: 'Power Whitening 2 Patients',
    image: 'https://fgmdentalgroup.com/wp-content/uploads/2022/11/Power-Whitening.png',
  },
  {
    name: 'Opaldame',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/opaldam-kit.jpg',
  },
  {
    name: 'Opalescence Dentifrice',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/opalescence-original-pasta-dental-blanqueante-ultradent_2_0.jpg',
  },
  {
    name: 'Home Whitening 22%/35%',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/opalescence-16-menta-patient-kit_0.png',
  },
  {
    name: 'Lampe COXO',
    image: 'https://www.coxo.com/uploads/202311/coxo-c-bright-in-led-whitening-light-c-bright-in-1.jpg',
  },
  {
    name: 'Lampe Blanchiment sans Support',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/beyond-polar-lampara-blanqueamiento_0.jpg',
  },

  // ── ENDODONTIE ────────────────────────────────────────────────
  {
    name: 'Orodeka',
    image: 'https://pd-dental.com/fichiers/11569_PD_EDTA_100ml_Packaging-and-Product-scaled.jpg',
  },
  {
    name: 'Revo S+',
    image: 'https://www.micro-mega.com/wp-content/uploads/2021/09/Revo-S-moteur-endo-scaled.jpg',
  },
  {
    name: 'Lime Fanta Gold',
    image: 'https://www.dentrealstore.com/cdn/shop/files/af-blue-rotary-niti-rotary-root-file-990451.jpg?v=1733145736&width=1200',
  },
  {
    name: 'Lime Fanta AF F One',
    image: 'https://www.dentrealstore.com/cdn/shop/files/af-f-one-file-niti-rotary-root-file-266252.jpg?v=1733146056&width=1200',
  },
  {
    name: 'Lime Denco',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/2-shape-limas-clasica-25mm-03.jpg',
  },
  {
    name: 'Lime K/H Mani',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/limas-k-file-vidu-etiqueta.jpg',
  },
  {
    name: 'Lime K/H Gen Endo',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/limas-k-file-vidu-etiqueta.jpg',
  },
  {
    name: 'Broche',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/th3_spiro-colorinox.jpg',
  },
  {
    name: 'Tire Nerfs',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/th3_spiro-colorinox.jpg',
  },
  {
    name: 'R-Endo R1/R2/R3',
    image: 'https://www.micro-mega.com/wp-content/uploads/2020/06/R-ENDO-scaled.jpg',
  },
  {
    name: 'Revo Spreader',
    image: 'https://www.micro-mega.com/wp-content/uploads/2020/06/REVO-SPREADER-scaled.jpg',
  },
  {
    name: 'Gutta Oktan 4%/6%',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/gutapercha-conicidad-04-120u-maillefer-a022m_0.jpg',
  },
  {
    name: 'Gutta Metabiomed 4%/6%',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/gutapercha-conicidad-04-120u-maillefer-a022m_0.jpg',
  },
  {
    name: 'Gutta 2%',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/a22n_4.jpg',
  },
  {
    name: 'Point Papier Oktan 4%/6%',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/puntas-de-papel-esteriles-maillefer_8.jpg',
  },
  {
    name: 'Point Papier Metabiomed 4%/6%',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/puntas-de-papel-esteriles-maillefer_8.jpg',
  },
  {
    name: 'Point Papier 2%',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/puntas-de-papel-esteriles-maillefer_8.jpg',
  },
  {
    name: 'Carven',
    image: 'https://www.dentalworldofficial.com/wp-content/uploads/2020/01/Prevest-Denpro-Carvene-2-min.jpg',
  },
  {
    name: 'Gutasol',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/gutasol-disolvente-gutapercha-20ml.jpg',
  },
  {
    name: 'Gutasolv Septadent',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/guttasolv-solvente-de-gutapercha-de-eucalipto-13-ml.jpg',
  },
  {
    name: 'MTA Biorep',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/mta-repair-hp-cemento-bioceramico.jpg',
  },
  {
    name: 'Neo Sealer Flo',
    image: 'https://www.dentalcity.com/CatalogImages/DENLN/18-22001-Product_Primary_Image-400X400.jpg',
  },
  {
    name: 'Diaroot',
    image: 'https://diadent.com/cdn/shop/products/Dia-RootBioSealer.jpg?v=1618551749',
  },
  {
    name: 'Biner LC',
    image: 'https://itena-clinical.com/wp-content/uploads/2020/10/BINER-LC.jpg',
  },
  {
    name: 'Metapex+',
    image: 'https://www.meta-biomed.com/upload/prd_img/metapex-plus.jpg',
  },
  {
    name: 'Calplus',
    image: 'https://www.dentalworldofficial.com/wp-content/uploads/2020/01/Prevest-Denpro-Calplus-Calcium-Hydroxide-Paste-m-600x600.jpg',
  },
  {
    name: 'Cal LC',
    image: 'https://www.prevestdenpro.com/wp-content/uploads/2021/08/Cal-LC.jpg',
  },
  {
    name: 'Cortisomol',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/cortisomol-sp-cemento.jpg',
  },
  {
    name: 'Endoseal',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/totalfill-bc-sealer-sellador-radipaco-jeringa-de-2-gr.jpg',
  },
  {
    name: 'Dolo Endo Gel',
    image: 'https://www.prevestdenpro.com/wp-content/uploads/2021/08/Dolo-Endogel-min.jpg',
  },
  {
    name: 'MD Cleanser',
    image: 'https://www.meta-biomed.com/upload/prd_img/md-cleanser.jpg',
  },
  {
    name: 'MD Chelcream',
    image: 'https://www.meta-biomed.com/upload/prd_img/md-chelcream.jpg',
  },
  {
    name: 'EDTA 18%',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/indispense-edta-18.jpg',
  },

  // ── CIMENT ────────────────────────────────────────────────────
  {
    name: 'Fuji CemOne',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/fujicem-evolve-cemento.jpg',
  },
  {
    name: 'Fuji 2 LC',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/gc-fuji-ii-lc-cemento-ionomero-vidrio_0.jpg',
  },
  {
    name: 'Ketac Molar',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/ketac-molar-easymix-3m-cemento-ionomero-vidrio_0.jpg',
  },
  {
    name: 'Theracem CA',
    image: 'https://cdn11.bigcommerce.com/s-4xfcjqmnan/images/stencil/565x752/products/437/549/bisco-dental-products-theracem-ca-syringe__07516.1730390338.jpg?c=1',
  },
  {
    name: 'Medifil',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/cavit-w-temporary-filling-material-10-tubos.jpg',
  },
  {
    name: 'Medicem',
    image: 'https://storage.googleapis.com/drive.dentacarts.com/public/products/249/24964_1.jpg',
  },
  {
    name: 'I Fil',
    image: 'https://itena-clinical.com/wp-content/uploads/2020/10/I-FIL.jpg',
  },
  {
    name: 'Fuji Plus Liquid',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/fuji-plus-kit-intro-gc.jpg',
  },
  {
    name: 'Relyx Temp',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/relyx-temp-nf-3m-cemento-temporal-50ml.jpg',
  },
  {
    name: 'NETC',
    image: 'https://dentdirect.com/wp-content/uploads/2017/06/netc-non-eugenol-temporay-cement.jpg',
  },
  {
    name: 'Provitemp',
    image: 'https://www.voco.dental/content/dam/voco/product-images/provitemp/provitemp_syringes.jpg',
  },
  {
    name: 'Dentotemp',
    image: 'https://www.dentalworldofficial.com/wp-content/uploads/2020/11/dentotemp-2642-1000x1000-1.jpg',
  },
  {
    name: 'Cavit 3M',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/cavit-w-temporary-filling-material-10-tubos.jpg',
  },
  {
    name: 'Cavitemp',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/cimpat-rosa-cemento-provisional.jpg',
  },
  {
    name: 'Provis',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/provil-novo-light-regular-set.jpg',
  },
  {
    name: 'Orafil G',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/coltosol-ecopack-coltene_0.jpg',
  },
  {
    name: 'Totalcem',
    image: 'https://itena-clinical.com/wp-content/uploads/2024/09/Totalcem-1.png',
  },
  {
    name: 'Totalceram',
    image: 'https://itena-clinical.com/wp-content/uploads/2024/09/Total-C-ram-1.png',
  },
  {
    name: 'Prevent Seal',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/helioseal-f-plus-sellador-de-fisuras-dentales.jpg',
  },
  {
    name: 'Pulpodent',
    image: 'https://www.dentaltix.com/en/sites/default/files/styles/large/public/pulpodent-hidrossido-calcio.jpg',
  },

  // ── HYGIÈNE ───────────────────────────────────────────────────
  {
    name: 'Jet Fort 2L',
    image: 'https://mixdent.pl/1976-medium_default/occ-prosept-jet-forte-2l.jpg',
  },
]

async function fix() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('MongoDB connecté')

  let updated = 0
  let notFound = 0

  for (const { name, image } of imageMap) {
    const res = await Product.findOneAndUpdate(
      { 'name.fr': name },
      { $set: { images: [image] } },
      { new: true }
    )
    if (res) {
      console.log(`✓ ${name}`)
      updated++
    } else {
      console.log(`⚠ Non trouvé : ${name}`)
      notFound++
    }
  }

  console.log(`\nTerminé. ${updated} mis à jour, ${notFound} non trouvés.`)
  await mongoose.disconnect()
}

fix().catch(err => { console.error(err); process.exit(1) })
