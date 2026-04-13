require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const Admin = require('./models/Admin')

const app = express()

// ── Middleware ────────────────────────────────────────────────
app.use(cors())
app.use(express.json())

// ── Routes ───────────────────────────────────────────────────
app.use('/api/auth', require('./routes/auth'))
app.use('/api/products', require('./routes/products'))
app.use('/api/leads', require('./routes/leads'))
app.use('/api/upload', require('./routes/upload'))

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

// ── Serve frontend in production ──────────────────────────────
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'))
  })
}

// ── Database + startup ────────────────────────────────────────
async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB connecté')

    // Create default admin if none exists
    const adminExists = await Admin.findOne()
    if (!adminExists) {
      await Admin.create({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      })
      console.log(`Admin créé: ${process.env.ADMIN_EMAIL}`)
    }

    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => console.log(`Serveur lancé sur http://localhost:${PORT}`))
  } catch (err) {
    console.error('Erreur démarrage:', err)
    process.exit(1)
  }
}

start()
