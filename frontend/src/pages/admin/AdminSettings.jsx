import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function AdminSettings() {
  const { authFetch, login } = useAuth()
  const [form, setForm] = useState({ currentPassword: '', newEmail: '', newPassword: '', confirmPassword: '' })
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setSuccess('')
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      return setError('Les mots de passe ne correspondent pas')
    }
    setLoading(true)
    try {
      const body = { currentPassword: form.currentPassword }
      if (form.newEmail) body.newEmail = form.newEmail
      if (form.newPassword) body.newPassword = form.newPassword

      const res = await authFetch('/api/auth/credentials', {
        method: 'PUT',
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      login(data.token)
      setSuccess('Paramètres mis à jour avec succès')
      setForm({ currentPassword: '', newEmail: '', newPassword: '', confirmPassword: '' })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <h1>Paramètres du compte</h1>
      </div>
      <div className="admin-settings-card">
        <form onSubmit={handleSubmit} className="admin-settings-form">
          {success && <div className="admin-success">{success}</div>}
          {error && <div className="admin-error">{error}</div>}

          <div className="form-group">
            <label>Mot de passe actuel *</label>
            <input
              type="password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              required
              placeholder="Requis pour toute modification"
            />
          </div>

          <hr style={{ margin: '1.5rem 0', borderColor: 'var(--color-border)' }} />

          <div className="form-group">
            <label>Nouvel email (optionnel)</label>
            <input
              type="email"
              name="newEmail"
              value={form.newEmail}
              onChange={handleChange}
              placeholder="Laisser vide pour ne pas changer"
            />
          </div>

          <div className="form-group">
            <label>Nouveau mot de passe (optionnel)</label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="Laisser vide pour ne pas changer"
            />
          </div>

          <div className="form-group">
            <label>Confirmer le nouveau mot de passe</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Répéter le nouveau mot de passe"
            />
          </div>

          <button type="submit" className="btn btn--primary" disabled={loading}>
            {loading ? 'Mise à jour...' : 'Mettre à jour'}
          </button>
        </form>
      </div>
    </div>
  )
}
