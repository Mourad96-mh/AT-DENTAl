const mongoose = require('mongoose')

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

module.exports = mongoose.model('Product', productSchema)
