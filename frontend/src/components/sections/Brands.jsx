import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { brands } from '../../data/brands'

export default function Brands() {
  const { t } = useTranslation()
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

  // Duplicate for seamless loop
  const doubled = [...brands, ...brands]

  return (
    <section className="brands-section" ref={ref}>
      <div className="container">
        <div className="section-header fade-in-up">
          <h2 className="section-title">{t('brands.title')}</h2>
          <p className="section-subtitle">{t('brands.subtitle')}</p>
        </div>
      </div>

      <div className="brands-marquee-wrap">
        <div className="brands-marquee">
          {doubled.map((brand, i) => (
            <div className="brand-item" key={`${brand.id}-${i}`}>
              <img
                src={brand.logo}
                alt={brand.name}
                className="brand-logo"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
