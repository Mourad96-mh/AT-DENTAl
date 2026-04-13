const express = require('express')
const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')
const protect = require('../middleware/auth')

const router = express.Router()

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password)
      return res.status(400).json({ message: 'Email et mot de passe requis' })

    const admin = await Admin.findOne({ email })
    if (!admin || !(await admin.comparePassword(password)))
      return res.status(401).json({ message: 'Identifiants incorrects' })

    const token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.json({ token })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

// PUT /api/auth/credentials  (protected)
router.put('/credentials', protect, async (req, res) => {
  try {
    const { currentPassword, newEmail, newPassword } = req.body
    const admin = await Admin.findOne({ email: req.admin.email })
    if (!admin) return res.status(404).json({ message: 'Admin introuvable' })

    if (!(await admin.comparePassword(currentPassword)))
      return res.status(401).json({ message: 'Mot de passe actuel incorrect' })

    if (newEmail) admin.email = newEmail
    if (newPassword) admin.password = newPassword
    await admin.save()

    const token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.json({ token })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

module.exports = router
