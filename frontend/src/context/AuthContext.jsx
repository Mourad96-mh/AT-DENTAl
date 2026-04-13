import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token') || null)

  const login = (newToken) => {
    localStorage.setItem('admin_token', newToken)
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem('admin_token')
    setToken(null)
  }

  const isAuth = !!token

  const authFetch = async (url, options = {}) => {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    })
    if (res.status === 401) logout()
    return res
  }

  return (
    <AuthContext.Provider value={{ token, isAuth, login, logout, authFetch }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
