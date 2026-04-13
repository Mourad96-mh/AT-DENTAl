import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FiMessageSquare, FiShoppingCart, FiCheck } from 'react-icons/fi'
import { products } from '../../data/products'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../utils/formatPrice'

export default function FeaturedProducts() {
  const { t } = useTranslation()
  const { addItem } = useCart()
  const [added, setAdded] = useState({})
  const sectionRef = useRef(null)
  const featured = products.filter((p) => p.featured)
  const doubled = [...featured, ...featured]

  const handleAdd = (product) => {
    addItem(product)
    setAdded((prev) => ({ ...prev, [product.id]: true }))
    setTimeout(() => setAdded((prev) => ({ ...prev, [product.id]: false })), 1500)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    if (sectionRef.current) {
      sectionRef.current.querySelectorAll('.fade-in-up').forEach((el) => observer.observe(el))
    }
    return () => observer.disconnect()
  }, [])

  return (
    <section className="products-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header fade-in-up">
          <h2 className="section-title">{t('products.title')}</h2>
          <p className="section-subtitle">{t('products.subtitle')}</p>
        </div>
      </div>

      <div className="products-marquee-wrap fade-in-up">
        <div className="products-marquee">
          {doubled.map((product, i) => (
            <article className="product-card" key={`${product.id}-${i}`}>
              <img
                src={product.image}
                alt={product.name}
                className="product-card-img"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <div className="product-card-img-placeholder" style={{ display: 'none' }}>🦷</div>
              <div className="product-card-body">
                <div className="product-card-badges">
                  <span className="badge badge--brand">{product.brand}</span>
                  <span className="badge badge--category">{product.category}</span>
                </div>
                <h3 className="product-card-name">{product.name}</h3>
                <p className="product-card-desc">{product.description}</p>
                <div className="product-card-price">{formatPrice(product.price)}</div>
                <div className="product-card-actions">
                  <button
                    className={`product-card-add${added[product.id] ? ' added' : ''}`}
                    onClick={() => handleAdd(product)}
                  >
                    {added[product.id] ? <FiCheck size={13} /> : <FiShoppingCart size={13} />}
                    {added[product.id] ? t('cart.added') : t('cart.add')}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
