import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi'
import { COMPANY } from '../../data/company'

export default function Footer() {
  const { t } = useTranslation()

  const categories = [
    'Empreintes', 'Endodontie', 'Stérilisation',
    'Restauration', 'Blanchiment', 'Matériels',
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div className="footer-logo">
              <img src="/images/logo.png" alt="AT Dental" className="footer-logo-img" />
            </div>
            <p className="footer-tagline">{t('footer.tagline')}</p>
          </div>

          {/* Navigation */}
          <div className="footer-col">
            <h4>{t('footer.nav_title')}</h4>
            <Link to="/">{t('nav.home')}</Link>
            <Link to="/products">{t('nav.products')}</Link>
            <Link to="/services">{t('nav.services')}</Link>
            <Link to="/about">{t('nav.about')}</Link>
            <Link to="/blog">{t('nav.blog')}</Link>
            <Link to="/contact">{t('nav.contact')}</Link>
          </div>

          {/* Categories */}
          <div className="footer-col">
            <h4>{t('footer.categories_title')}</h4>
            {categories.map((c) => (
              <Link key={c} to={`/products?category=${c.toLowerCase()}`}>{c}</Link>
            ))}
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>{t('footer.contact_title')}</h4>
            <a href={COMPANY.phone1Href}>
              <FiPhone size={13} />
              {COMPANY.phone1}
            </a>
            <a href={COMPANY.phone2Href}>
              <FiPhone size={13} />
              {COMPANY.phone2}
            </a>
            <a href={`mailto:${COMPANY.email}`}>
              <FiMail size={13} />
              {COMPANY.email}
            </a>
            <p>
              <FiMapPin size={13} />
              {COMPANY.address}, {COMPANY.city}
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{t('footer.rights')}</p>
          <a href="#">{t('footer.privacy')}</a>
        </div>
      </div>
    </footer>
  )
}
