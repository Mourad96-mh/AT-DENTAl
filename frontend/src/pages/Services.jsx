import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FiPackage, FiTool, FiHeadphones, FiBookOpen, FiTruck, FiCheck, FiArrowRight } from 'react-icons/fi'

const SERVICE_ICONS = [FiPackage, FiTool, FiHeadphones, FiBookOpen, FiTruck]

export default function Services() {
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

  const services = [1, 2, 3, 4, 5].map((n, i) => ({
    key: `s${n}`,
    Icon: SERVICE_ICONS[i],
    title: t(`services.s${n}_title`),
    desc: t(`services.s${n}_desc`),
    features: [
      t(`services.s${n}_feat1`),
      t(`services.s${n}_feat2`),
      t(`services.s${n}_feat3`),
    ],
    reversed: i % 2 !== 0,
  }))

  return (
    <div className="services-page" ref={ref}>
      {/* Page Hero */}
      <div className="page-hero page-hero--services">
        <div className="container page-hero-content">
          <h1 className="page-hero-title">{t('services.page_title')}</h1>
          <p className="page-hero-subtitle">{t('services.page_subtitle')}</p>
        </div>
      </div>

      {/* Services list */}
      <div className="services-list">
        {services.map(({ key, Icon, title, desc, features, reversed }, i) => (
          <div key={key} className={`service-row${reversed ? ' reversed' : ''}${i % 2 === 0 ? ' service-row--white' : ' service-row--gray'}`}>
            <div className="container service-row-inner fade-in-up">
              <div className="service-icon-col">
                <div className="service-icon-wrap">
                  <Icon size={40} />
                </div>
                <div className="service-number">0{i + 1}</div>
              </div>
              <div className="service-text-col">
                <h2 className="service-title">{title}</h2>
                <p className="service-desc">{desc}</p>
                <ul className="service-features">
                  {features.map((f, fi) => (
                    <li key={fi}>
                      <FiCheck size={15} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="btn btn--primary" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
                  {t('common.contact_us')} <FiArrowRight size={16} style={{ marginLeft: 6 }} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>{t('services.cta_title')}</h2>
            <p>{t('services.cta_sub')}</p>
            <div className="cta-actions">
              <Link to="/contact" className="btn btn--accent btn--lg">{t('common.contact_us')}</Link>
              <Link to="/products" className="btn btn--outline-white btn--lg">{t('cta.secondary')}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
