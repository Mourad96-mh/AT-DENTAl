import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { categories } from '../../data/categories'

export default function Categories() {
  const { t, i18n } = useTranslation()
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    if (ref.current) {
      ref.current.querySelectorAll('.fade-in-up').forEach((el) => observer.observe(el))
    }
    return () => observer.disconnect()
  }, [])

  return (
    <section className="categories-section section--white" ref={ref}>
      <div className="container">
        <div className="section-header fade-in-up">
          <h2 className="section-title">{t('categories.title')}</h2>
          <p className="section-subtitle">{t('categories.subtitle')}</p>
        </div>

        <div className="categories-grid">
          {categories.map((cat, i) => (
            <Link
              to={`/products?category=${cat.id}`}
              className="category-card fade-in-up"
              key={cat.id}
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <div className="category-icon" style={{ background: cat.color + '18', color: cat.color }}>
                {cat.icon}
              </div>
              <span className="category-name">
                {i18n.language === 'en' ? cat.labelEn : cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
