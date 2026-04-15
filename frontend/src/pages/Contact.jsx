import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend, FiCheck } from 'react-icons/fi'
import { COMPANY } from '../data/company'

export default function Contact() {
  const { t, i18n } = useTranslation()
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = t('contact.required')
    if (!form.email.trim())   e.email   = t('contact.required')
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = t('contact.invalid_email')
    if (!form.subject)        e.subject = t('contact.required')
    if (!form.message.trim()) e.message = t('contact.required')
    return e
  }

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors((er) => ({ ...er, [e.target.name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSending(true)
    setTimeout(() => { setSending(false); setSubmitted(true) }, 1200)
  }

  const infoCards = [
    { Icon: FiMapPin, label: t('contact.address_label'), value: `${COMPANY.address}, ${COMPANY.city}` },
    { Icon: FiPhone,  label: t('contact.phone_label'),   value: COMPANY.phone1, href: COMPANY.phone1Href },
    { Icon: FiMail,   label: t('contact.email_label'),   value: COMPANY.email, href: `mailto:${COMPANY.email}` },
    { Icon: FiClock,  label: t('contact.hours_label'),   value: i18n.language === 'en' ? COMPANY.hoursEn : COMPANY.hours },
  ]

  const subjects = ['subject_devis', 'subject_info', 'subject_sav', 'subject_partenariat', 'subject_autre']

  return (
    <div className="contact-page">
      {/* Page Hero */}
      <div className="page-hero page-hero--contact">
        <div className="container page-hero-content">
          <h1 className="page-hero-title">{t('contact.page_title')}</h1>
          <p className="page-hero-subtitle">{t('contact.page_subtitle')}</p>
        </div>
      </div>

      <div className="container contact-layout">
        {/* Form */}
        <div className="contact-form-col">
          <div className="contact-form-card">
            <h2 className="contact-form-title">{t('contact.form_title')}</h2>

            {submitted ? (
              <div className="contact-success">
                <div className="success-icon"><FiCheck size={32} /></div>
                <h3>{t('contact.success_title')}</h3>
                <p>{t('contact.success_msg')}</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">{t('contact.name')} *</label>
                    <input
                      type="text"
                      name="name"
                      className={`form-input${errors.name ? ' error' : ''}`}
                      placeholder="Mohammed Alami"
                      value={form.name}
                      onChange={handleChange}
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t('contact.email')} *</label>
                    <input
                      type="email"
                      name="email"
                      className={`form-input${errors.email ? ' error' : ''}`}
                      placeholder="votre@email.ma"
                      value={form.email}
                      onChange={handleChange}
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">{t('contact.phone')}</label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-input"
                      placeholder="+212 6XX XXX XXX"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t('contact.subject')} *</label>
                    <select
                      name="subject"
                      className={`form-input${errors.subject ? ' error' : ''}`}
                      value={form.subject}
                      onChange={handleChange}
                    >
                      <option value="">{t('contact.subject_placeholder')}</option>
                      {subjects.map((s) => (
                        <option key={s} value={s}>{t(`contact.${s}`)}</option>
                      ))}
                    </select>
                    {errors.subject && <span className="form-error">{errors.subject}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">{t('contact.message')} *</label>
                  <textarea
                    name="message"
                    className={`form-input form-textarea${errors.message ? ' error' : ''}`}
                    placeholder={t('contact.message_placeholder')}
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                  />
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>

                <button type="submit" className="btn btn--primary w-full contact-submit" disabled={sending}>
                  {sending ? (
                    <><span className="spinner" /> {t('contact.sending')}</>
                  ) : (
                    <><FiSend size={16} /> {t('contact.send')}</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="contact-info-col">
          <h2 className="contact-info-title">{t('contact.info_title')}</h2>

          <div className="contact-info-cards">
            {infoCards.map(({ Icon, label, value, href }) => (
              <div className="contact-info-card" key={label}>
                <div className="info-card-icon"><Icon size={20} /></div>
                <div>
                  <div className="info-card-label">{label}</div>
                  {href ? (
                    <a href={href} className="info-card-value info-card-link">{value}</a>
                  ) : (
                    <div className="info-card-value">{value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent('Bonjour, je suis intéressé(e) par vos produits dentaires.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-contact-btn"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Contacter sur WhatsApp
          </a>

          {/* Map placeholder */}
          <div className="contact-map">
            <div className="map-placeholder">
              <FiMapPin size={32} />
              <span>{COMPANY.city}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
