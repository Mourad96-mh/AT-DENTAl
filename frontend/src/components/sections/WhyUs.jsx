import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { FiShield, FiTruck, FiHeadphones, FiGrid } from 'react-icons/fi'

export default function WhyUs() {
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

  const items = [
    { Icon: FiShield,      titleKey: 'whyus.quality_title',  descKey: 'whyus.quality_desc' },
    { Icon: FiTruck,       titleKey: 'whyus.delivery_title', descKey: 'whyus.delivery_desc' },
    { Icon: FiHeadphones,  titleKey: 'whyus.sav_title',      descKey: 'whyus.sav_desc' },
    { Icon: FiGrid,        titleKey: 'whyus.catalog_title',  descKey: 'whyus.catalog_desc' },
  ]

  return (
    <section className="whyus-section" ref={ref}>
      <div className="container">
        <div className="section-header fade-in-up">
          <h2 className="section-title">{t('whyus.title')}</h2>
          <p className="section-subtitle">{t('whyus.subtitle')}</p>
        </div>

        <div className="whyus-grid">
          {items.map(({ Icon, titleKey, descKey }, i) => (
            <div
              className="whyus-card fade-in-up"
              key={titleKey}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="whyus-icon">
                <Icon size={22} />
              </div>
              <h3>{t(titleKey)}</h3>
              <p>{t(descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
