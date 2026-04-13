import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'

const CATEGORIES = [
  { id: 'usage-unique', label: 'Usage Unique' },
  { id: 'hygiene', label: 'Hygiène & Désinfection' },
  { id: 'empreinte', label: 'Empreinte' },
  { id: 'blanchiment', label: 'Blanchiment' },
  { id: 'endodontie', label: 'Endodontie' },
  { id: 'ciment', label: 'Ciment' },
  { id: 'restauration', label: 'Restauration' },
  { id: 'reconstitution', label: 'Reconstitution' },
  { id: 'fraise', label: 'Fraise & Finition' },
  { id: 'instrumentation', label: 'Instrumentation' },
  { id: 'petit-equipement', label: 'Petit Équipement' },
  { id: 'grand-equipement', label: 'Grand Équipement' },
  { id: 'fauteuils', label: 'Fauteuils Dentaires' },
  { id: 'technologie', label: 'Technologie' },
]

const EMPTY_FORM = {
  nameFr: '', nameEn: '',
  descFr: '', descEn: '',
  brand: '', category: '', price: '',
  featured: false, inStock: true,
  tags: '',
}

export default function ProductFormModal({ product, onClose, onSaved }) {
  const { authFetch, token } = useAuth()
  const [form, setForm] = useState(EMPTY_FORM)
  const [images, setImages] = useState([])
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (product) {
      setForm({
        nameFr: product.name?.fr || '',
        nameEn: product.name?.en || '',
        descFr: product.description?.fr || '',
        descEn: product.description?.en || '',
        brand: product.brand || '',
        category: product.category || '',
        price: product.price || '',
        featured: product.featured || false,
        inStock: product.inStock !== undefined ? product.inStock : true,
        tags: (product.tags || []).join(', '),
      })
      setImages(product.images || [])
    }
  }, [product])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('image', file)
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      setImages((prev) => [...prev, data.url])
    } catch (err) {
      setError('Erreur upload: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (url) => setImages((prev) => prev.filter((i) => i !== url))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.nameFr || !form.brand || !form.category || !form.price) {
      return setError('Nom (FR), marque, catégorie et prix sont requis')
    }
    setSaving(true)
    try {
      const body = {
        name: { fr: form.nameFr, en: form.nameEn },
        description: { fr: form.descFr, en: form.descEn },
        brand: form.brand,
        category: form.category,
        price: Number(form.price),
        featured: form.featured,
        inStock: form.inStock,
        images,
        tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      }
      const url = product ? `/api/products/${product._id}` : '/api/products'
      const method = product ? 'PATCH' : 'POST'
      const res = await authFetch(url, { method, body: JSON.stringify(body) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      onSaved(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-header">
          <h2>{product ? 'Modifier le produit' : 'Ajouter un produit'}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          {error && <div className="admin-error">{error}</div>}

          <div className="form-row">
            <div className="form-group">
              <label>Nom (FR) *</label>
              <input name="nameFr" value={form.nameFr} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Nom (EN)</label>
              <input name="nameEn" value={form.nameEn} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Marque *</label>
              <input name="brand" value={form.brand} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Catégorie *</label>
              <select name="category" value={form.category} onChange={handleChange} required>
                <option value="">Sélectionner</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Prix (MAD) *</label>
              <input type="number" name="price" value={form.price} onChange={handleChange} min="0" required />
            </div>
          </div>

          <div className="form-group">
            <label>Description (FR)</label>
            <textarea name="descFr" value={form.descFr} onChange={handleChange} rows={3} />
          </div>
          <div className="form-group">
            <label>Description (EN)</label>
            <textarea name="descEn" value={form.descEn} onChange={handleChange} rows={3} />
          </div>

          <div className="form-group">
            <label>Tags (séparés par virgules)</label>
            <input name="tags" value={form.tags} onChange={handleChange} placeholder="composite, esthétique, universel" />
          </div>

          <div className="form-row form-row--check">
            <label className="form-check">
              <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
              Produit vedette
            </label>
            <label className="form-check">
              <input type="checkbox" name="inStock" checked={form.inStock} onChange={handleChange} />
              En stock
            </label>
          </div>

          <div className="form-group">
            <label>Images</label>
            <div className="image-upload-area">
              {images.map((url) => (
                <div key={url} className="image-thumb">
                  <img src={url} alt="" />
                  <button type="button" className="image-remove" onClick={() => removeImage(url)}>✕</button>
                </div>
              ))}
              <label className="image-add">
                {uploading ? 'Upload...' : '+ Ajouter'}
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} disabled={uploading} />
              </label>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn--outline" onClick={onClose}>Annuler</button>
            <button type="submit" className="btn btn--primary" disabled={saving || uploading}>
              {saving ? 'Enregistrement...' : product ? 'Mettre à jour' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
