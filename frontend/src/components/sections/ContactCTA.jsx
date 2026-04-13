import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FiPhone, FiArrowRight } from 'react-icons/fi'
import { COMPANY } from '../../data/company'

export default function ContactCTA() {
  const { t } = useTranslation()

  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2>{t('cta.title')}</h2>
          <p>{t('cta.subtitle')}</p>

          <div className="cta-actions">
            <Link to="/contact" className="btn btn--accent btn--lg">
              {t('cta.primary')}
              <FiArrowRight size={18} />
            </Link>
            <Link to="/products" className="btn btn--outline-white btn--lg">
              {t('cta.secondary')}
            </Link>
          </div>

          <a href={COMPANY.phone1Href} className="cta-phone">
            <FiPhone size={15} />
            {t('cta.phone_label')} {COMPANY.phone1}
          </a>
        </div>
      </div>
    </section>
  )
}
