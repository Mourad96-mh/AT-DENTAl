const express = require('express')
const Product = require('../models/Product')
const protect = require('../middleware/auth')

const router = express.Router()

// GET /api/products  (public)
router.get('/', async (req, res) => {
  try {
    const { category, brand, featured, search, inStock, page = 1, limit = 100 } = req.query
    const filter = {}

    if (category) filter.category = category
    if (brand) filter.brand = brand
    if (featured === 'true') filter.featured = true
    if (inStock === 'true') filter.inStock = true
    if (search) {
      filter.$or = [
        { 'name.fr': { $regex: search, $options: 'i' } },
        { 'name.en': { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
      ]
    }

    const skip = (Number(page) - 1) * Number(limit)
    const [products, total] = await Promise.all([
      Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Product.countDocuments(filter),
    ])

    res.json({ products, total, page: Number(page), pages: Math.ceil(total / Number(limit)) })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

// GET /api/products/:idOrSlug  (public) — accepts MongoDB ID or slug
router.get('/:idOrSlug', async (req, res) => {
  try {
    const { idOrSlug } = req.params
    const isId = /^[a-f\d]{24}$/i.test(idOrSlug)
    const product = isId
      ? await Product.findById(idOrSlug)
      : await Product.findOne({ slug: idOrSlug })
    if (!product) return res.status(404).json({ message: 'Produit introuvable' })
    res.json(product)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

// POST /api/products  (protected)
router.post('/', protect, async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// PATCH /api/products/:id  (protected)
router.patch('/:id', protect, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!product) return res.status(404).json({ message: 'Produit introuvable' })
    res.json(product)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// DELETE /api/products/:id  (protected)
router.delete('/:id', protect, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.status(404).json({ message: 'Produit introuvable' })
    res.json({ message: 'Produit supprimé' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

module.exports = router
