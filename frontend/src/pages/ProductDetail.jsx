import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FiArrowLeft, FiShoppingCart, FiCheck, FiPlus, FiMinus, FiTag, FiLayers } from 'react-icons/fi'
import { categories } from '../data/categories'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/formatPrice'
import { API_BASE } from '../config'
import SEO from '../components/SEO'

function normalize(p, lang) {
  return {
    id: p.slug || p._id,
    name: p.name?.[lang] || p.name?.fr || '',
    description: p.description?.[lang] || p.description?.fr || '',
    brand: p.brand,
    category: p.category,
    image: p.images?.[0] || '',
    price: p.price,
    discount: p.discount || 0,
  }
}

const CATEGORY_FEATURES = {
  'usage-unique':      ['Usage unique stérile', 'Conforme aux normes EN ISO', 'Disponible en plusieurs tailles'],
  'hygiene':           ["Spectre d'action large", 'Compatible surfaces et instruments', 'Certifié EN 13727'],
  'empreinte':         ['Haute précision dimensionnelle', 'Compatible tous porte-empreintes', 'Prise contrôlée et reproductible'],
  'blanchiment':       ['Efficacité cliniquement prouvée', "Biocompatible, sans danger pour l'émail", 'Résultats visibles dès la 1ère séance'],
  'endodontie':        ['Biocompatible et bioactif', 'Excellente étanchéité', 'Facilité de manipulation'],
  'ciment':            ['Adhésion chimique à la dentine', 'Libération de fluor', 'Bonne résistance à la compression'],
  'restauration':      ['Esthétique naturelle', 'Haute résistance mécanique', 'Compatible tous systèmes adhésifs'],
  'reconstitution':    ['Haute résistance à la flexion', "Module d'élasticité proche de la dentine", 'Mise en œuvre rapide'],
  'fraise':            ['Carbure de tungstène / Acier inox', 'Coupe précise et durable', 'Autoclavable 134°C'],
  'instrumentation':   ['Acier inoxydable chirurgical', 'Autoclavable 134°C', 'Ergonomique et résistant'],
  'petit-equipement':  ['Haute performance clinique', 'Entretien facile', 'Garantie constructeur'],
  'grand-equipement':  ['Installation et mise en service incluses', 'Garantie et SAV AT Dental', 'Conforme normes CE'],
  'fauteuils':         ['Design ergonomique', 'Réglages motorisés multi-positions', 'Revêtement antibactérien'],
  'technologie':       ['Haute résolution d\'image', 'Interface logicielle intuitive', 'Compatible logiciels dentaires'],
}

export default function ProductDetail() {
  const { id } = useParams()
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { addItem, items, setQty, removeItem } = useCart()
  const [added, setAdded] = useState(false)
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const lang = i18n.language === 'en' ? 'en' : 'fr'

  useEffect(() => {
    setLoading(true)
    setNotFound(false)
    fetch(`${API_BASE}/api/products/${id}`)
      .then((r) => {
        if (!r.ok) { setNotFound(true); setLoading(false); return null }
        return r.json()
      })
      .then((data) => {
        if (!data) return
        const p = normalize(data, lang)
        setProduct(p)
        // fetch related products (same category)
        fetch(`${API_BASE}/api/products?category=${data.category}&limit=5`)
          .then((r) => r.json())
          .then((res) => {
            setRelated(
              (res.products || [])
                .filter((r) => r._id !== data._id)
                .slice(0, 4)
                .map((r) => normalize(r, lang))
            )
          })
          .catch(() => {})
          .finally(() => setLoading(false))
      })
      .catch(() => { setNotFound(true); setLoading(false) })
  }, [id])

  if (loading) {
    return (
      <div className="pd-not-found">
        <div className="container">
          <div className="pd-not-found-inner">
            <p>Chargement...</p>
          </div>
        </div>
      </div>
    )
  }

  if (notFound || !product) {
    return (
      <div className="pd-not-found">
        <div className="container">
          <div className="pd-not-found-inner">
            <div className="pd-not-found-icon">🔍</div>
            <h1>{t('product_detail.not_found')}</h1>
            <p>{t('product_detail.not_found_sub')}</p>
            <Link to="/products" className="btn btn--primary" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
              <FiArrowLeft size={16} /> {t('product_detail.back')}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const category = categories.find((c) => c.id === product.category)
  const features = CATEGORY_FEATURES[product.category] || []

  const cartItem = items.find((i) => i.id === product.id)
  const qty = cartItem?.qty ?? 0

  const handleAdd = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  const handleIncrease = () => {
    if (qty === 0) addItem(product)
    else setQty(product.id, qty + 1)
  }

  const handleDecrease = () => {
    if (qty <= 1) removeItem(product.id)
    else setQty(product.id, qty - 1)
  }

  const productSchema = product ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    brand: { '@type': 'Brand', name: product.brand },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'MAD',
      ...(product.price > 0 ? { price: product.price } : {}),
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'AT Dental' },
    },
  } : null

  const breadcrumbSchema = product ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://at-dental.com' },
      { '@type': 'ListItem', position: 2, name: 'Produits', item: 'https://at-dental.com/products' },
      { '@type': 'ListItem', position: 3, name: product.name, item: `https://at-dental.com/products/${product.id}` },
    ],
  } : null

  return (
    <div className="pd-page">
      {product && (
        <SEO
          title={`${product.name} — ${product.brand}`}
          description={`${product.description} Disponible chez AT Dental, distributeur de fournitures dentaires au Maroc. Livraison nationale.`}
          keywords={`${product.name}, ${product.brand}, ${product.category}, fournitures dentaires maroc`}
          canonical={`/products/${product.id}`}
          ogImage={product.image}
          ogType="product"
          schema={[productSchema, breadcrumbSchema]}
        />
      )}
      {/* Breadcrumb */}
      <div className="pd-breadcrumb-bar">
        <div className="container pd-breadcrumb">
          <button className="pd-back-btn" onClick={() => navigate(-1)}>
            <FiArrowLeft size={15} />
            {t('product_detail.back')}
          </button>
          <span className="pd-breadcrumb-sep">/</span>
          <Link to="/products" className="pd-breadcrumb-link">{t('nav.products')}</Link>
          <span className="pd-breadcrumb-sep">/</span>
          <span className="pd-breadcrumb-current">{product.name}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="container pd-layout">
        {/* Image column */}
        <div className="pd-image-col">
          <div className="pd-image-wrap">
            <img
              src={product.image || 'https://placehold.co/600x500/e8f4f8/0d3b6e?text=Produit'}
              alt={product.name}
              className="pd-image"
              onError={(e) => { e.target.src = 'https://placehold.co/600x500/e8f4f8/0d3b6e?text=Produit' }}
            />
            {category && (
              <span className="pd-cat-badge" style={{ background: category.color }}>
                {category.icon} {i18n.language === 'en' ? category.labelEn : category.label}
              </span>
            )}
          </div>
        </div>

        {/* Details column */}
        <div className="pd-details-col">
          <span className="pd-brand-tag">{product.brand}</span>
          <h1 className="pd-product-name">{product.name}</h1>

          <p className="pd-description">{product.description}</p>

          {features.length > 0 && (
            <div className="pd-features">
              <h3 className="pd-features-title">
                <FiLayers size={16} />
                {t('product_detail.features')}
              </h3>
              <ul className="pd-features-list">
                {features.map((f) => (
                  <li key={f}>
                    <FiCheck size={14} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="pd-meta">
            <div className="pd-meta-item">
              <FiTag size={14} />
              <span className="pd-meta-label">{t('product_detail.brand')} :</span>
              <strong>{product.brand}</strong>
            </div>
            <div className="pd-meta-item">
              <FiLayers size={14} />
              <span className="pd-meta-label">{t('product_detail.category')} :</span>
              <strong>{i18n.language === 'en' ? category?.labelEn : category?.label}</strong>
            </div>
          </div>

          <div className="pd-price-row">
            {product.discount > 0 && (
              <span className="badge--sale badge--sale-lg">-{product.discount}%</span>
            )}
            {product.discount > 0 ? (
              <div className="pd-price-wrap">
                <span className="price-old">{formatPrice(product.price)}</span>
                <span className="pd-price price-sale">{formatPrice(Math.round(product.price * (1 - product.discount / 100)))}</span>
              </div>
            ) : (
              <span className="pd-price">{formatPrice(product.price)}</span>
            )}
          </div>

          {/* Cart controls */}
          <div className="pd-cart-actions">
            <button
              className={`pd-add-btn${added ? ' added' : ''}`}
              onClick={handleAdd}
            >
              {added ? <FiCheck size={18} /> : <FiShoppingCart size={18} />}
              {added ? t('cart.added') : t('product_detail.add_to_cart')}
            </button>

            {qty > 0 && (
              <div className="pd-qty-row">
                <button className="pd-qty-btn" onClick={handleDecrease} aria-label="Diminuer">
                  <FiMinus size={14} />
                </button>
                <span className="pd-qty-value">{qty}</span>
                <button className="pd-qty-btn" onClick={handleIncrease} aria-label="Augmenter">
                  <FiPlus size={14} />
                </button>
                <span className="pd-qty-label">{t('cart.article')}{qty > 1 ? 's' : ''} {t('product_detail.in_cart')}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="pd-related">
          <div className="container">
            <h2 className="pd-related-title">{t('product_detail.related')}</h2>
            <div className="pd-related-grid">
              {related.map((p) => (
                <Link to={`/products/${p.id}`} className="pd-related-card" key={p.id}>
                  <div className="pd-related-img-wrap">
                    <img
                      src={p.image || 'https://placehold.co/300x220/e8f4f8/0d3b6e?text=Produit'}
                      alt={p.name}
                      onError={(e) => { e.target.src = 'https://placehold.co/300x220/e8f4f8/0d3b6e?text=Produit' }}
                    />
                  </div>
                  <div className="pd-related-body">
                    <span className="pd-related-brand">{p.brand}</span>
                    <h4 className="pd-related-name">{p.name}</h4>
                    <div className="pd-related-price-wrap">
                      {p.discount > 0 ? (
                        <>
                          <span className="badge--sale badge--sale-sm">-{p.discount}%</span>
                          <span className="price-old">{formatPrice(p.price)}</span>
                          <span className="pd-related-price price-sale">{formatPrice(Math.round(p.price * (1 - p.discount / 100)))}</span>
                        </>
                      ) : (
                        <span className="pd-related-price">{formatPrice(p.price)}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
