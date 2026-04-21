const mongoose = require('mongoose')

function generateSlug(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const productSchema = new mongoose.Schema(
  {
    name: {
      fr: { type: String, required: true },
      en: { type: String, default: '' },
    },
    description: {
      fr: { type: String, default: '' },
      en: { type: String, default: '' },
    },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
    slug: { type: String, unique: true, sparse: true },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
)

productSchema.index({ 'name.fr': 'text', 'name.en': 'text', brand: 'text', category: 'text' })

// Auto-generate slug from French name before saving
productSchema.pre('save', async function () {
  if (this.slug) return
  const base = generateSlug(`${this.name.fr}-${this.brand}`)
  let slug = base
  let i = 1
  while (await mongoose.model('Product').exists({ slug, _id: { $ne: this._id } })) {
    slug = `${base}-${i++}`
  }
  this.slug = slug
})

// Also handle findOneAndUpdate / findByIdAndUpdate
productSchema.pre('findOneAndUpdate', async function () {
  const update = this.getUpdate()
  const nameFr = update?.name?.fr || update?.$set?.['name.fr']
  const brand  = update?.brand   || update?.$set?.brand
  if (!nameFr || !brand) return
  const existing = await this.model.findOne(this.getQuery(), 'slug')
  if (existing?.slug) return
  const base = generateSlug(`${nameFr}-${brand}`)
  let slug = base
  let i = 1
  while (await this.model.exists({ slug })) {
    slug = `${base}-${i++}`
  }
  this.setUpdate({ ...update, slug })
})

module.exports = mongoose.model('Product', productSchema)
