import './i18n/index.js'
import './styles/variables.css'
import './styles/reset.css'
import './styles/layout.css'
import './styles/components.css'
import './styles/utilities.css'
import './styles/pages.css'
import './styles/admin.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
)
