import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FiPhone, FiMail, FiMenu, FiX, FiShoppingCart } from 'react-icons/fi'
import { COMPANY } from '../../data/company'
import { useCart } from '../../context/CartContext'

const LANGS = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
]

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const { totalItems, setPanelOpen } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const changeLang = (code) => {
    i18n.changeLanguage(code)
    localStorage.setItem('dentapro-lang', code)
    setMenuOpen(false)
  }

  const navItems = [
    { to: '/',         label: t('nav.home'),     end: true },
    { to: '/products', label: t('nav.products') },
    { to: '/services', label: t('nav.services') },
    { to: '/about',    label: t('nav.about') },
    { to: '/blog',     label: t('nav.blog') },
    { to: '/contact',  label: t('nav.contact') },
  ]

  return (
    <header className="site-header">
      {/* Topbar */}
      <div className="topbar">
        <div className="container topbar-inner">
          <div className="topbar-left">
            <a href={COMPANY.phone1Href}>
              <FiPhone size={11} />
              {COMPANY.phone1}
            </a>
            <a href={COMPANY.phone2Href}>
              <FiPhone size={11} />
              {COMPANY.phone2}
            </a>
            <a href={`mailto:${COMPANY.email}`}>
              <FiMail size={11} />
              {COMPANY.email}
            </a>
          </div>
          <div className="topbar-right">
            <a href="#" aria-label="Facebook">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className={`header-main${scrolled ? ' scrolled' : ''}`}>
        <div className="container header-inner">
          <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
            <img src="/images/logo.png" alt="AT Dental" className="logo-img" />
          </Link>

          <nav className="nav">
            {navItems.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="header-right">
            <button
              className="cart-nav-btn"
              onClick={() => setPanelOpen(true)}
              aria-label="Panier devis"
            >
              <FiShoppingCart size={18} />
              {totalItems > 0 && <span className="cart-nav-badge">{totalItems}</span>}
            </button>
            <div className="lang-switcher">
              {LANGS.map(({ code, label }) => (
                <button
                  key={code}
                  className={`lang-btn${i18n.language === code ? ' active' : ''}`}
                  onClick={() => changeLang(code)}
                >
                  {label}
                </button>
              ))}
            </div>
            <button
              className="burger-btn"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <>
          <div className="mobile-menu-backdrop" onClick={() => setMenuOpen(false)} />
          <nav className="mobile-menu">
            {navItems.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
            <div className="mobile-menu-footer">
              <div className="lang-switcher">
                {LANGS.map(({ code, label }) => (
                  <button
                    key={code}
                    className={`lang-btn${i18n.language === code ? ' active' : ''}`}
                    onClick={() => changeLang(code)}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <a href={COMPANY.phone1Href} className="mobile-menu-contact">
                <FiPhone size={13} /> {COMPANY.phone1}
              </a>
              <a href={COMPANY.phone2Href} className="mobile-menu-contact">
                <FiPhone size={13} /> {COMPANY.phone2}
              </a>
            </div>
          </nav>
        </>
      )}
    </header>
  )
}
