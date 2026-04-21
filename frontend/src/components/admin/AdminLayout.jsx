import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import AdminNav from './AdminNav'

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <Helmet>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <AdminNav />
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  )
}
