const express = require('express')
const Lead = require('../models/Lead')
const protect = require('../middleware/auth')

const router = express.Router()

// POST /api/leads  (public — contact/quote form)
router.post('/', async (req, res) => {
  try {
    const lead = await Lead.create(req.body)
    res.status(201).json(lead)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// GET /api/leads  (protected)
router.get('/', protect, async (req, res) => {
  try {
    const { status, source } = req.query
    const filter = {}
    if (status) filter.status = status
    if (source) filter.source = source
    const leads = await Lead.find(filter).sort({ createdAt: -1 })
    res.json(leads)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

// PATCH /api/leads/:id  (protected)
router.patch('/:id', protect, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!lead) return res.status(404).json({ message: 'Demande introuvable' })
    res.json(lead)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// DELETE /api/leads/:id  (protected)
router.delete('/:id', protect, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id)
    if (!lead) return res.status(404).json({ message: 'Demande introuvable' })
    res.json({ message: 'Demande supprimée' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

module.exports = router
