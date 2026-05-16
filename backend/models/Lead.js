const mongoose = require('mongoose')

const leadSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      enum: ['contact', 'quote', 'product', 'cart'],
      default: 'contact',
    },
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    subject: { type: String, default: '' },
    productName: { type: String, default: '' },
    quantity: { type: String, default: '' },
    message: { type: String, default: '' },
    items: [
      {
        name: { type: String },
        brand: { type: String },
        qty: { type: Number },
      },
    ],
    status: {
      type: String,
      enum: ['new', 'contacted', 'closed'],
      default: 'new',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Lead', leadSchema)
