import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../../context/AuthContext'

const STATUS_LABELS = { new: 'Nouveau', contacted: 'Contacté', closed: 'Clôturé' }
const SOURCE_LABELS = { contact: 'Contact', quote: 'Devis', product: 'Produit', cart: 'Panier' }

export default function AdminLeads() {
  const { authFetch } = useAuth()
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('')
  const [filterSource, setFilterSource] = useState('')

  const fetchLeads = useCallback(async () => {
    const params = new URLSearchParams()
    if (filterStatus) params.set('status', filterStatus)
    if (filterSource) params.set('source', filterSource)
    const res = await authFetch(`/api/leads?${params}`)
    const data = await res.json()
    setLeads(data)
    setLoading(false)
  }, [filterStatus, filterSource, authFetch])

  useEffect(() => {
    fetchLeads()
    const interval = setInterval(fetchLeads, 30000)
    return () => clearInterval(interval)
  }, [fetchLeads])

  const updateStatus = async (id, status) => {
    await authFetch(`/api/leads/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    })
    setLeads((prev) => prev.map((l) => (l._id === id ? { ...l, status } : l)))
  }

  const deleteLead = async (id) => {
    if (!confirm('Supprimer cette demande ?')) return
    await authFetch(`/api/leads/${id}`, { method: 'DELETE' })
    setLeads((prev) => prev.filter((l) => l._id !== id))
  }

  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === 'new').length,
    contacted: leads.filter((l) => l.status === 'contacted').length,
    closed: leads.filter((l) => l.status === 'closed').length,
  }

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <h1>Demandes & Contacts</h1>
        <span className="admin-refresh-hint">Auto-refresh 30s</span>
      </div>

      <div className="admin-stats">
        <div className="admin-stat-card">
          <span className="admin-stat-value">{stats.total}</span>
          <span className="admin-stat-label">Total</span>
        </div>
        <div className="admin-stat-card admin-stat-card--new">
          <span className="admin-stat-value">{stats.new}</span>
          <span className="admin-stat-label">Nouveaux</span>
        </div>
        <div className="admin-stat-card admin-stat-card--contacted">
          <span className="admin-stat-value">{stats.contacted}</span>
          <span className="admin-stat-label">Contactés</span>
        </div>
        <div className="admin-stat-card admin-stat-card--closed">
          <span className="admin-stat-value">{stats.closed}</span>
          <span className="admin-stat-label">Clôturés</span>
        </div>
      </div>

      <div className="admin-filters">
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">Tous les statuts</option>
          <option value="new">Nouveau</option>
          <option value="contacted">Contacté</option>
          <option value="closed">Clôturé</option>
        </select>
        <select value={filterSource} onChange={(e) => setFilterSource(e.target.value)}>
          <option value="">Toutes les sources</option>
          <option value="contact">Contact</option>
          <option value="quote">Devis</option>
          <option value="product">Produit</option>
          <option value="cart">Panier</option>
        </select>
      </div>

      {loading ? (
        <div className="admin-loading">Chargement...</div>
      ) : leads.length === 0 ? (
        <div className="admin-empty">Aucune demande trouvée.</div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Source</th>
                <th>Nom</th>
                <th>Contact</th>
                <th>Sujet / Produits</th>
                <th>Message</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id} className={`lead-row lead-row--${lead.status}`}>
                  <td>{new Date(lead.createdAt).toLocaleDateString('fr-FR')}</td>
                  <td>
                    <span className={`admin-badge admin-badge--${lead.source}`}>
                      {SOURCE_LABELS[lead.source] || lead.source}
                    </span>
                  </td>
                  <td>{lead.name || '—'}</td>
                  <td>
                    <div>{lead.email || '—'}</div>
                    <div>{lead.phone || '—'}</div>
                  </td>
                  <td>
                    {lead.source === 'cart' && lead.items && lead.items.length > 0 ? (
                      <ul className="lead-cart-items">
                        {lead.items.map((item, idx) => (
                          <li key={idx} className="lead-cart-item">
                            <span className="lead-cart-item-name">{item.name}</span>
                            {item.brand && <span className="lead-cart-item-brand"> ({item.brand})</span>}
                            <span className="lead-qty"> × {item.qty}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <>
                        <div>{lead.subject || '—'}</div>
                        {lead.productName && <div className="lead-product">{lead.productName}</div>}
                        {lead.quantity && <div className="lead-qty">Qté: {lead.quantity}</div>}
                      </>
                    )}
                  </td>
                  <td className="lead-message">{lead.message || '—'}</td>
                  <td>
                    <select
                      value={lead.status}
                      onChange={(e) => updateStatus(lead._id, e.target.value)}
                      className={`status-select status-select--${lead.status}`}
                    >
                      <option value="new">Nouveau</option>
                      <option value="contacted">Contacté</option>
                      <option value="closed">Clôturé</option>
                    </select>
                  </td>
                  <td>
                    <button className="admin-btn-delete" onClick={() => deleteLead(lead._id)} title="Supprimer">
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
