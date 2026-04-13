const express = require('express')
const cloudinary = require('cloudinary').v2
const protect = require('../middleware/auth')
const upload = require('../middleware/upload')

const router = express.Router()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// POST /api/upload  (protected)
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Aucune image fournie' })

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'mat-den', resource_type: 'image' },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      )
      stream.end(req.file.buffer)
    })

    res.json({ url: result.secure_url })
  } catch (err) {
    res.status(500).json({ message: 'Erreur upload: ' + err.message })
  }
})

module.exports = router
