import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../../context/AuthContext'
import ProductFormModal from './ProductFormModal'

export default function AdminProducts() {
  const { authFetch } = useAuth()
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterStock, setFilterStock] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editProduct, setEditProduct] = useState(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ limit: 2000 })
    if (search) params.set('search', search)
    if (filterCategory) params.set('category', filterCategory)
    if (filterStock === 'true') params.set('inStock', 'true')
    const res = await authFetch(`/api/products?${params}`)
    const data = await res.json()
    setProducts(data.products || [])
    setTotal(data.total || 0)
    setLoading(false)
  }, [search, filterCategory, filterStock, authFetch])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const toggleStock = async (product) => {
    const res = await authFetch(`/api/products/${product._id}`, {
      method: 'PATCH',
      body: JSON.stringify({ inStock: !product.inStock }),
    })
    const updated = await res.json()
    setProducts((prev) => prev.map((p) => (p._id === updated._id ? updated : p)))
  }

  const toggleFeatured = async (product) => {
    const res = await authFetch(`/api/products/${product._id}`, {
      method: 'PATCH',
      body: JSON.stringify({ featured: !product.featured }),
    })
    const updated = await res.json()
    setProducts((prev) => prev.map((p) => (p._id === updated._id ? updated : p)))
  }

  const deleteProduct = async (id) => {
    if (!confirm('Supprimer ce produit définitivement ?')) return
    await authFetch(`/api/products/${id}`, { method: 'DELETE' })
    setProducts((prev) => prev.filter((p) => p._id !== id))
    setTotal((t) => t - 1)
  }

  const openAdd = () => { setEditProduct(null); setShowModal(true) }
  const openEdit = (product) => { setEditProduct(product); setShowModal(true) }
  const onSaved = (saved) => {
    setProducts((prev) => {
      const exists = prev.find((p) => p._id === saved._id)
      if (exists) return prev.map((p) => (p._id === saved._id ? saved : p))
      return [saved, ...prev]
    })
    if (!editProduct) setTotal((t) => t + 1)
    setShowModal(false)
  }

  const stats = {
    total,
    inStock: products.filter((p) => p.inStock).length,
    outOfStock: products.filter((p) => !p.inStock).length,
    featured: products.filter((p) => p.featured).length,
  }

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <h1>Produits</h1>
        <button className="btn btn--primary" onClick={openAdd}>+ Ajouter un produit</button>
      </div>

      <div className="admin-stats">
        <div className="admin-stat-card">
          <span className="admin-stat-value">{stats.total}</span>
          <span className="admin-stat-label">Total</span>
        </div>
        <div className="admin-stat-card admin-stat-card--new">
          <span className="admin-stat-value">{stats.inStock}</span>
          <span className="admin-stat-label">En stock</span>
        </div>
        <div className="admin-stat-card admin-stat-card--closed">
          <span className="admin-stat-value">{stats.outOfStock}</span>
          <span className="admin-stat-label">Hors stock</span>
        </div>
        <div className="admin-stat-card admin-stat-card--contacted">
          <span className="admin-stat-value">{stats.featured}</span>
          <span className="admin-stat-label">Vedettes</span>
        </div>
      </div>

      <div className="admin-filters">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="">Toutes catégories</option>
          <option value="usage-unique">Usage Unique</option>
          <option value="hygiene">Hygiène</option>
          <option value="empreinte">Empreinte</option>
          <option value="blanchiment">Blanchiment</option>
          <option value="endodontie">Endodontie</option>
          <option value="ciment">Ciment</option>
          <option value="restauration">Restauration</option>
          <option value="reconstitution">Reconstitution</option>
          <option value="fraise">Fraise</option>
          <option value="instrumentation">Instrumentation</option>
          <option value="petit-equipement">Petit Équipement</option>
          <option value="grand-equipement">Grand Équipement</option>
          <option value="fauteuils">Fauteuils</option>
          <option value="technologie">Technologie</option>
        </select>
        <select value={filterStock} onChange={(e) => setFilterStock(e.target.value)}>
          <option value="">Tous les stocks</option>
          <option value="true">En stock</option>
          <option value="false">Hors stock</option>
        </select>
      </div>

      {loading ? (
        <div className="admin-loading">Chargement...</div>
      ) : products.length === 0 ? (
        <div className="admin-empty">Aucun produit trouvé.</div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Nom</th>
                <th>Marque</th>
                <th>Catégorie</th>
                <th>Prix</th>
                <th>Stock</th>
                <th>Vedette</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>
                    {p.images?.[0] ? (
                      <img src={p.images[0]} alt={p.name?.fr} className="admin-product-thumb" />
                    ) : (
                      <div className="admin-product-thumb admin-product-thumb--empty">?</div>
                    )}
                  </td>
                  <td>
                    <div className="product-name-fr">{p.name?.fr}</div>
                    {p.name?.en && <div className="product-name-en">{p.name.en}</div>}
                  </td>
                  <td>{p.brand}</td>
                  <td>{p.category}</td>
                  <td>
                    <div>{p.price?.toLocaleString('fr-FR')} MAD</div>
                    {p.discount > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                        <span className="badge--sale badge--sale-sm">-{p.discount}%</span>
                        <span style={{ fontSize: '0.78rem', color: 'var(--color-success)', fontWeight: 600 }}>
                          {Math.round(p.price * (1 - p.discount / 100)).toLocaleString('fr-FR')} MAD
                        </span>
                      </div>
                    )}
                  </td>
                  <td>
                    <button
                      className={`admin-toggle ${p.inStock ? 'admin-toggle--on' : 'admin-toggle--off'}`}
                      onClick={() => toggleStock(p)}
                      title={p.inStock ? 'En stock — cliquer pour désactiver' : 'Hors stock — cliquer pour activer'}
                    >
                      {p.inStock ? '✓ Stock' : '✕ Stock'}
                    </button>
                  </td>
                  <td>
                    <button
                      className={`admin-toggle ${p.featured ? 'admin-toggle--on' : 'admin-toggle--off'}`}
                      onClick={() => toggleFeatured(p)}
                      title={p.featured ? 'Vedette — cliquer pour retirer' : 'Pas vedette — cliquer pour mettre en avant'}
                    >
                      {p.featured ? '★' : '☆'}
                    </button>
                  </td>
                  <td className="admin-actions">
                    <button className="admin-btn-edit" onClick={() => openEdit(p)} title="Modifier">✎</button>
                    <button className="admin-btn-delete" onClick={() => deleteProduct(p._id)} title="Supprimer">✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <ProductFormModal
          product={editProduct}
          onClose={() => setShowModal(false)}
          onSaved={onSaved}
        />
      )}
    </div>
  )
}
