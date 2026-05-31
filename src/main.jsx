import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { SearchProvider } from './context/SearchContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <AuthProvider>
          <SearchProvider>
            <App />
          </SearchProvider>
        </AuthProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
