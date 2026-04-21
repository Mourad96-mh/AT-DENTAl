import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FiSearch, FiX, FiFilter, FiShoppingCart, FiCheck, FiPlus, FiMinus, FiEye } from 'react-icons/fi'
import { categories } from '../data/categories'
import { brands } from '../data/brands'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/formatPrice'
import { API_BASE } from '../config'
import SEO from '../components/SEO'

export default function Products() {
  const { t, i18n } = useTranslation()
  const { addItem, items, setQty, removeItem } = useCart()
  const [added, setAdded] = useState({})
  const [searchParams, setSearchParams] = useSearchParams()

  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || '')
  const [activeBrand, setActiveBrand] = useState(searchParams.get('brand') || '')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const lang = i18n.language === 'en' ? 'en' : 'fr'

  useEffect(() => {
    fetch(`${API_BASE}/api/products?limit=200`)
      .then((r) => r.json())
      .then((data) => { setProducts(data.products || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  // Normalize API product fields for the template
  const normalize = (p) => ({
    id: p._id,
    name: p.name?.[lang] || p.name?.fr || '',
    description: p.description?.[lang] || p.description?.fr || '',
    brand: p.brand,
    category: p.category,
    image: p.images?.[0] || '',
    price: p.price,
  })

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [sidebarOpen])

  const filtered = useMemo(() => {
    return products
      .filter((p) => {
        const name = p.name?.[lang] || p.name?.fr || ''
        const desc = p.description?.[lang] || p.description?.fr || ''
        const matchCat = !activeCategory || p.category === activeCategory
        const matchBrand = !activeBrand || p.brand?.toLowerCase() === activeBrand.toLowerCase()
        const matchSearch = !search || name.toLowerCase().includes(search.toLowerCase()) || desc.toLowerCase().includes(search.toLowerCase())
        return matchCat && matchBrand && matchSearch
      })
      .map(normalize)
  }, [products, search, activeCategory, activeBrand, lang])

  const reset = () => {
    setSearch('')
    setActiveCategory('')
    setActiveBrand('')
    setSearchParams({})
  }

  const setCategory = (id) => {
    setActiveCategory(id)
    setSearchParams(id ? { category: id } : {})
  }

  const setBrand = (name) => {
    setActiveBrand(name)
    setSearchParams(name ? { brand: name } : {})
  }

  const hasFilters = search || activeCategory || activeBrand
  const filterCount = [search, activeCategory, activeBrand].filter(Boolean).length

  const handleAddToCart = (product) => {
    addItem(product)
    setAdded((prev) => ({ ...prev, [product.id]: true }))
    setTimeout(() => setAdded((prev) => ({ ...prev, [product.id]: false })), 1500)
  }

  const getCartQty = (id) => items.find((i) => i.id === id)?.qty ?? 0

  const handleIncrease = (product) => {
    const qty = getCartQty(product.id)
    if (qty === 0) addItem(product)
    else setQty(product.id, qty + 1)
  }

  const handleDecrease = (product) => {
    const qty = getCartQty(product.id)
    if (qty <= 1) removeItem(product.id)
    else setQty(product.id, qty - 1)
  }

  const activeCategoryData = categories.find((c) => c.id === activeCategory)
  const pageTitle = activeCategoryData
    ? `${activeCategoryData.label} — Fournitures Dentaires Maroc`
    : 'Catalogue — Fournitures & Équipements Dentaires au Maroc'
  const pageDesc = activeCategoryData
    ? `Achetez des produits de ${activeCategoryData.label.toLowerCase()} de qualité professionnelle au Maroc. AT Dental distribue les meilleures marques dentaires avec livraison nationale.`
    : 'Catalogue complet de fournitures et équipements dentaires au Maroc. Plus de 500 produits : composites, endodontie, turbines, fauteuils, stérilisation. Livraison dans tout le Maroc.'

  return (
    <div className="products-page">
      <SEO
        title={pageTitle}
        description={pageDesc}
        keywords="catalogue fournitures dentaires maroc, acheter équipements dentaires, prix matériaux dentaires maroc, turbine dentaire prix, composite dentaire maroc"
        canonical="/products"
      />
      {/* Page Hero */}
      <div className="page-hero page-hero--products">
        <div className="container page-hero-content">
          <h1 className="page-hero-title">{t('products.page_title')}</h1>
          <p className="page-hero-subtitle">{t('products.page_subtitle')}</p>
        </div>
      </div>

      <div className="container products-layout">
        {/* Mobile filter toggle */}
        <button className="filter-toggle-btn" onClick={() => setSidebarOpen(o => !o)}>
          <FiFilter size={16} />
          Filtres
          {filterCount > 0 && <span className="filter-badge">{filterCount}</span>}
        </button>

        {/* Sidebar backdrop (mobile only) */}
        {sidebarOpen && (
          <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <aside className={`products-sidebar${sidebarOpen ? ' open' : ''}`}>
          <div className="sidebar-handle" />
          <div className="sidebar-header">
            <h3>Filtres</h3>
            <div className="sidebar-header-right">
              {hasFilters && (
                <button className="reset-link" onClick={reset}>
                  <FiX size={14} /> {t('products.reset')}
                </button>
              )}
              <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)} aria-label="Fermer">
                <FiX size={18} />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="sidebar-section">
            <div className="sidebar-search">
              <FiSearch size={15} className="search-icon" />
              <input
                type="text"
                placeholder={t('products.search_placeholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="sidebar-input"
              />
              {search && (
                <button className="clear-search" onClick={() => setSearch('')}>
                  <FiX size={13} />
                </button>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="sidebar-section">
            <h4 className="sidebar-label">{t('products.filter_category')}</h4>
            <div className="sidebar-filters">
              <button
                className={`filter-chip${!activeCategory ? ' active' : ''}`}
                onClick={() => setCategory('')}
              >
                {t('products.filter_all')}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`filter-chip${activeCategory === cat.id ? ' active' : ''}`}
                  onClick={() => setCategory(cat.id)}
                >
                  {cat.icon} {i18n.language === 'en' ? cat.labelEn : cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="sidebar-section">
            <h4 className="sidebar-label">{t('products.filter_brand')}</h4>
            <div className="sidebar-filters">
              <button
                className={`filter-chip${!activeBrand ? ' active' : ''}`}
                onClick={() => setBrand('')}
              >
                {t('products.filter_all')}
              </button>
              {brands.map((b) => (
                <button
                  key={b.id}
                  className={`filter-chip${activeBrand === b.name ? ' active' : ''}`}
                  onClick={() => setBrand(b.name)}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Grid */}
        <div className="products-grid-area">
          <div className="grid-results-bar">
            <span className="grid-results-count">
              <strong>{filtered.length}</strong> {t('products.results')}
            </span>
            {hasFilters && (
              <button className="reset-link" onClick={reset}>
                <FiX size={13} /> {t('products.reset')}
              </button>
            )}
          </div>

          {loading ? (
            <div className="admin-loading">Chargement des produits...</div>
          ) : filtered.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>{t('products.no_results')}</h3>
              <p>{t('products.no_results_sub')}</p>
              <button className="btn btn--outline" onClick={reset} style={{ marginTop: '1rem' }}>
                {t('products.reset')}
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filtered.map((product) => (
                <article className="product-grid-card" key={product.id}>
                  <div className="pgc-img-wrap">
                    <img
                      src={product.image || 'https://placehold.co/400x260/e8f4f8/0d3b6e?text=Produit'}
                      alt={product.name}
                      className="pgc-img"
                      onError={(e) => { e.target.src = 'https://placehold.co/400x260/e8f4f8/0d3b6e?text=Produit' }}
                    />
                    <span className="pgc-category-badge">{product.category}</span>
                  </div>
                  <div className="pgc-body">
                    <span className="pgc-brand">{product.brand}</span>
                    <h3 className="pgc-name">{product.name}</h3>
                    <p className="pgc-desc">{product.description}</p>
                    <div className="pgc-price">{formatPrice(product.price)}</div>
                    <div className="pgc-actions">
                      <button
                        className={`pgc-add-btn${added[product.id] ? ' added' : ''}`}
                        onClick={() => handleAddToCart(product)}
                        aria-label="Ajouter au panier"
                      >
                        {added[product.id] ? <FiCheck size={14} /> : <FiShoppingCart size={14} />}
                        {added[product.id] ? t('cart.added') : t('cart.add')}
                      </button>
                      <Link to={`/products/${product.id}`} className="pgc-detail-btn" aria-label="Voir le détail">
                        <FiEye size={14} />
                      </Link>
                      <div className="pgc-qty">
                        <button
                          className="pgc-qty-btn"
                          onClick={() => handleDecrease(product)}
                          disabled={getCartQty(product.id) === 0}
                          aria-label="Diminuer"
                        >
                          <FiMinus size={12} />
                        </button>
                        <span className="pgc-qty-value">{getCartQty(product.id)}</span>
                        <button
                          className="pgc-qty-btn"
                          onClick={() => handleIncrease(product)}
                          aria-label="Augmenter"
                        >
                          <FiPlus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
