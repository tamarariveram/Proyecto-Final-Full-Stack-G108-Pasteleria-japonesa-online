import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'
import CartProvider from './context/CartContext'
import AuthProvider from './context/AuthContext'
import PedidosProvider from './context/PedidosContext'
import ProductProvider from './context/ProductContext'

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
