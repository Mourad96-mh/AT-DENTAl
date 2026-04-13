import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FiStar, FiUsers, FiZap, FiShield, FiArrowRight } from 'react-icons/fi'
import { brands } from '../data/brands'

const TEAM = [
  { name: 'Directeur Commercial',   initials: 'DC', role: 'Direction commerciale & stratégie' },
  { name: 'Responsable Technique',  initials: 'RT', role: 'SAV & support équipements' },
  { name: 'Délégué Commercial',     initials: 'DC', role: 'Région Casablanca' },
  { name: 'Délégué Commercial',     initials: 'DC', role: 'Région Marrakech & Sud' },
]

export default function About() {
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

  const values = [
    { Icon: FiStar,    titleKey: 'about.v1_title', descKey: 'about.v1_desc' },
    { Icon: FiUsers,   titleKey: 'about.v2_title', descKey: 'about.v2_desc' },
    { Icon: FiZap,     titleKey: 'about.v3_title', descKey: 'about.v3_desc' },
    { Icon: FiShield,  titleKey: 'about.v4_title', descKey: 'about.v4_desc' },
  ]

  const stats = [
    { numKey: 'about.stat1_num', labelKey: 'about.stat1_label' },
    { numKey: 'about.stat2_num', labelKey: 'about.stat2_label' },
    { numKey: 'about.stat3_num', labelKey: 'about.stat3_label' },
    { numKey: 'about.stat4_num', labelKey: 'about.stat4_label' },
  ]

  return (
    <div className="about-page" ref={ref}>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="container page-hero-content">
          <h1 className="page-hero-title">{t('about.page_title')}</h1>
          <p className="page-hero-subtitle">{t('about.page_subtitle')}</p>
        </div>
      </div>

      {/* Story */}
      <section className="about-story section--white">
        <div className="container about-story-inner fade-in-up">
          <div className="about-story-img">
            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80"
              alt="Cabinet dentaire"
            />
          </div>
          <div className="about-story-text">
            <div className="section-badge">{t('about.story_badge')}</div>
            <h2 className="section-title" style={{ textAlign: 'left' }}>{t('about.story_title')}</h2>
            <p>{t('about.story_p1')}</p>
            <p>{t('about.story_p2')}</p>
            <Link to="/contact" className="btn btn--primary" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
              {t('common.contact_us')} <FiArrowRight size={16} style={{ marginLeft: 6 }} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats-section section--dark fade-in-up">
        <div className="container">
          <h2 className="section-title section-title--white text-center" style={{ textAlign: 'center', marginBottom: '3rem' }}>{t('about.stats_title')}</h2>
          <div className="about-stats-grid">
            {stats.map(({ numKey, labelKey }) => (
              <div className="about-stat" key={numKey}>
                <div className="about-stat-num">{t(numKey)}</div>
                <div className="about-stat-label">{t(labelKey)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values section--white">
        <div className="container">
          <div className="section-header fade-in-up">
            <div className="section-badge">{t('about.mission_badge')}</div>
            <h2 className="section-title">{t('about.mission_title')}</h2>
          </div>
          <div className="whyus-grid fade-in-up">
            {values.map(({ Icon, titleKey, descKey }, i) => (
              <div className="whyus-card" key={titleKey} style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="whyus-icon"><Icon size={22} /></div>
                <h3>{t(titleKey)}</h3>
                <p>{t(descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-team section--gray">
        <div className="container">
          <div className="section-header fade-in-up">
            <div className="section-badge">{t('about.team_badge')}</div>
            <h2 className="section-title">{t('about.team_title')}</h2>
          </div>
          <div className="team-grid fade-in-up">
            {TEAM.map((member, i) => (
              <div className="team-card" key={i}>
                <div className="team-avatar">{member.initials}</div>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner brands */}
      <section className="about-brands section--white">
        <div className="container">
          <div className="section-header fade-in-up">
            <h2 className="section-title">{t('brands.title')}</h2>
            <p className="section-subtitle">{t('brands.subtitle')}</p>
          </div>
          <div className="about-brands-grid fade-in-up">
            {brands.map((b) => (
              <div className="about-brand-item" key={b.id}>
                <img src={b.logo} alt={b.name} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>{t('cta.title')}</h2>
            <p>{t('cta.subtitle')}</p>
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
