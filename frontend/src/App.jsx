import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Tienda from './pages/Tienda'
import Detalle from './pages/Detalle'
import Carrito from './pages/Carrito'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Perfil from './pages/Perfil'
import AdminProductos from './pages/AdminProductos'
import AdminPedidos from './pages/AdminPedidos'
import FormProducto from './pages/FormProducto'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'

const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/producto/:id" element={<Detalle />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminProductos />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/pedidos"
            element={
              <AdminRoute>
                <AdminPedidos />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/producto/nuevo"
            element={
              <AdminRoute>
                <FormProducto />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/producto/:id"
            element={
              <AdminRoute>
                <FormProducto />
              </AdminRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
