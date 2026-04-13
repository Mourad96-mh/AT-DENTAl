import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FiArrowRight, FiFileText } from 'react-icons/fi'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          {t('hero.title')}<br />
          <span>{t('hero.title_accent')}</span>
        </h1>

        <p className="hero-subtitle">{t('hero.subtitle')}</p>

        <div className="hero-ctas">
          <Link to="/products" className="btn btn--accent btn--lg">
            <FiArrowRight size={18} />
            {t('hero.cta_primary')}
          </Link>
          <Link to="/contact" className="btn btn--outline-white btn--lg">
            <FiFileText size={18} />
            {t('hero.cta_secondary')}
          </Link>
        </div>

        <div className="hero-stats">
          <div>
            <div className="hero-stat-num">+500</div>
            <div className="hero-stat-label">{t('hero.stat_products')}</div>
          </div>
          <div>
            <div className="hero-stat-num">+20</div>
            <div className="hero-stat-label">{t('hero.stat_brands')}</div>
          </div>
          <div>
            <div className="hero-stat-num">+10</div>
            <div className="hero-stat-label">{t('hero.stat_years')}</div>
          </div>
          <div>
            <div className="hero-stat-num">🇲🇦</div>
            <div className="hero-stat-label">{t('hero.stat_delivery')}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
