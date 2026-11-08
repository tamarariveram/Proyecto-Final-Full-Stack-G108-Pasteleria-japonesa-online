import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartProvider'
import { AuthProvider } from './context/AuthProvider'
import { PedidosProvider } from './context/PedidosProvider'
import { ProductProvider } from './context/ProductProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <PedidosProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </PedidosProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
