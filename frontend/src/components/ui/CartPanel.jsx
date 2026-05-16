import { useEffect, useState } from 'react'
import { FiX, FiTrash2, FiPlus, FiMinus, FiShoppingCart } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import { useCart } from '../../context/CartContext'
import { COMPANY } from '../../data/company'
import { formatPrice } from '../../utils/formatPrice'

const API_BASE = import.meta.env.VITE_API_URL || ''

export default function CartPanel() {
  const { t } = useTranslation()
  const { items, totalItems, panelOpen, setPanelOpen, removeItem, setQty, clearCart } = useCart()
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  const [showCheckout, setShowCheckout] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (showCheckout) setShowCheckout(false)
        else setPanelOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [setPanelOpen, showCheckout])

  // Lock body scroll when panel open
  useEffect(() => {
    document.body.style.overflow = panelOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [panelOpen])

  const buildWhatsAppUrl = (name, phone) => {
    const lines = items.map((i) => `• ${i.name} (${i.brand}) — qté: ${i.qty}`)
    const body = `Bonjour AT Dental,\n\nJe souhaite recevoir un devis pour les produits suivants :\n\n${lines.join('\n')}\n\nNom: ${name}\nTél: ${phone}\n\nMerci.`
    return `https://wa.me/${COMPANY.phone1Whatsapp}?text=${encodeURIComponent(body)}`
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = t('cart.checkout_name_required')
    if (!form.phone.trim()) e.phone = t('cart.checkout_phone_required')
    return e
  }

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setSubmitting(true)
    try {
      await fetch(`${API_BASE}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'cart',
          name: form.name.trim(),
          phone: form.phone.trim(),
          items: items.map(({ name, brand, qty }) => ({ name, brand, qty })),
        }),
      })
    } catch (_) {
      // silently fail — WhatsApp still opens
    }

    const waUrl = buildWhatsAppUrl(form.name.trim(), form.phone.trim())
    clearCart()
    setShowCheckout(false)
    setForm({ name: '', phone: '' })
    setPanelOpen(false)
    window.open(waUrl, '_blank', 'noopener,noreferrer')
    setSubmitting(false)
  }

  return (
    <>
      {/* Backdrop */}
      {panelOpen && (
        <div
          className="cart-backdrop"
          onClick={() => { setShowCheckout(false); setPanelOpen(false) }}
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      <div className={`cart-panel${panelOpen ? ' open' : ''}`} role="dialog" aria-label="Panier devis">
        {/* Header */}
        <div className="cart-panel-header">
          <div className="cart-panel-title">
            <FiShoppingCart size={18} />
            <span>{t('cart.title')}</span>
            {totalItems > 0 && <span className="cart-panel-count">{totalItems}</span>}
          </div>
          <button className="cart-panel-close" onClick={() => { setShowCheckout(false); setPanelOpen(false) }} aria-label="Fermer">
            <FiX size={20} />
          </button>
        </div>

        {/* Checkout form overlay */}
        {showCheckout && (
          <div className="cart-checkout-overlay">
            <div className="cart-checkout-modal">
              <h3 className="cart-checkout-title">{t('cart.checkout_title')}</h3>
              <form onSubmit={handleCheckoutSubmit} noValidate>
                <div className="cart-checkout-field">
                  <label htmlFor="co-name">{t('cart.checkout_name')}</label>
                  <input
                    id="co-name"
                    type="text"
                    placeholder={t('cart.checkout_name_placeholder')}
                    value={form.name}
                    onChange={(e) => { setForm((f) => ({ ...f, name: e.target.value })); setErrors((err) => ({ ...err, name: '' })) }}
                  />
                  {errors.name && <span className="cart-checkout-error">{errors.name}</span>}
                </div>
                <div className="cart-checkout-field">
                  <label htmlFor="co-phone">{t('cart.checkout_phone')}</label>
                  <input
                    id="co-phone"
                    type="tel"
                    placeholder={t('cart.checkout_phone_placeholder')}
                    value={form.phone}
                    onChange={(e) => { setForm((f) => ({ ...f, phone: e.target.value })); setErrors((err) => ({ ...err, phone: '' })) }}
                  />
                  {errors.phone && <span className="cart-checkout-error">{errors.phone}</span>}
                </div>
                <button type="submit" className="btn btn--accent w-full cart-whatsapp-btn" disabled={submitting}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {t('cart.checkout_submit')}
                </button>
                <button type="button" className="cart-clear-btn" onClick={() => setShowCheckout(false)}>
                  {t('cart.checkout_cancel')}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Body */}
        <div className="cart-panel-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <FiShoppingCart size={48} />
              <p>{t('cart.empty')}</p>
            </div>
          ) : (
            <ul className="cart-items">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item-img-wrap">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-img"
                      onError={(e) => { e.target.src = 'https://placehold.co/60x60/e8f4f8/0d3b6e?text=🦷' }}
                    />
                  </div>
                  <div className="cart-item-info">
                    <span className="cart-item-brand">{item.brand}</span>
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-price">{formatPrice(item.price)}</p>
                    <div className="cart-item-controls">
                      <button
                        className="qty-btn"
                        onClick={() => setQty(item.id, item.qty - 1)}
                        disabled={item.qty <= 1}
                        aria-label="Diminuer"
                      >
                        <FiMinus size={12} />
                      </button>
                      <span className="qty-value">{item.qty}</span>
                      <button
                        className="qty-btn"
                        onClick={() => setQty(item.id, item.qty + 1)}
                        aria-label="Augmenter"
                      >
                        <FiPlus size={12} />
                      </button>
                    </div>
                  </div>
                  <button className="cart-item-remove" onClick={() => removeItem(item.id)} aria-label="Supprimer">
                    <FiTrash2 size={15} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-panel-footer">
            <div className="cart-summary">
              <span>{t('cart.total_items')}</span>
              <strong>{totalItems} {t('cart.article')}{totalItems > 1 ? 's' : ''}</strong>
            </div>
            <div className="cart-total">
              <span>{t('cart.total_price')}</span>
              <strong>{formatPrice(totalPrice)}</strong>
            </div>

            <button
              className="btn btn--accent w-full cart-whatsapp-btn"
              onClick={() => setShowCheckout(true)}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t('cart.whatsapp_cta')}
            </button>

            <button className="cart-clear-btn" onClick={clearCart}>
              <FiTrash2 size={13} />
              {t('cart.clear')}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
