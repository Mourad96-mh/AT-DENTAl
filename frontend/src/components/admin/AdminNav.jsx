import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function AdminNav() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <nav className="admin-nav">
      <div className="admin-nav__brand">
        <span className="admin-nav__logo">AT Dental</span>
        <span className="admin-nav__badge">Admin</span>
      </div>
      <div className="admin-nav__links">
        <NavLink to="/admin/products" className={({ isActive }) => 'admin-nav__link' + (isActive ? ' active' : '')}>
          Produits
        </NavLink>
        <NavLink to="/admin/leads" className={({ isActive }) => 'admin-nav__link' + (isActive ? ' active' : '')}>
          Demandes
        </NavLink>
        <NavLink to="/admin/settings" className={({ isActive }) => 'admin-nav__link' + (isActive ? ' active' : '')}>
          Paramètres
        </NavLink>
      </div>
      <button className="admin-nav__logout btn btn--outline" onClick={handleLogout}>
        Déconnexion
      </button>
    </nav>
  )
}
