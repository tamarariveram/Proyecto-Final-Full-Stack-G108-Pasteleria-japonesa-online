import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartProvider'
import { AuthProvider } from './context/AuthProvider'
import { PedidosProvider } from './context/PedidosProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PedidosProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </PedidosProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
