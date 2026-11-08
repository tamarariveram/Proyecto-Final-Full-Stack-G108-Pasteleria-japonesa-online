import { Link } from 'react-router-dom'
import { Table, Button, Badge } from 'react-bootstrap'
import Swal from 'sweetalert2'
import AdminNav from '../components/AdminNav'
import { useProductos } from '../hooks/useProductos'
import { usePedidos } from '../hooks/usePedidos'
import { formatearPrecio } from '../utils/formato'

const AdminProductos = () => {
  const { productos, eliminarProducto } = useProductos()
  const { pedidos } = usePedidos()

  const tienePedidos = (id) => pedidos.some((pedido) => pedido.items.some((item) => item.producto_id === id))

  const handleEliminar = async (producto) => {
    if (tienePedidos(producto.id)) {
      Swal.fire({
        title: 'No se puede eliminar',
        text: `${producto.nombre} tiene pedidos asociados. Puedes dejar su stock en 0 para ocultarlo de la venta.`,
        icon: 'error',
        confirmButtonColor: '#2f4a3a',
      })
      return
    }

    const respuesta = await Swal.fire({
      title: '¿Eliminar producto?',
      text: `Se eliminará ${producto.nombre}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#c8102e',
    })

    if (respuesta.isConfirmed) {
      eliminarProducto(producto.id)
    }
  }

  return (
    <main className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="mb-0">Panel admin</h1>
        <Button as={Link} to="/admin/producto/nuevo" variant="dark" className="rounded-pill">
          + Nuevo producto
        </Button>
      </div>
      <AdminNav />
      <p className="text-muted">{productos.length} productos</p>
      <Table responsive hover className="align-middle tabla-kashi">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Categoría</th>
            <th className="text-end">Precio</th>
            <th className="text-center">Stock</th>
            <th className="text-center">Destacado</th>
            <th className="text-end">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>
                <div className="d-flex align-items-center gap-3">
                  <img src={producto.imagen_url} alt="" className="admin-img rounded" />
                  <span className="fw-semibold">{producto.nombre}</span>
                </div>
              </td>
              <td>{producto.categoria.nombre}</td>
              <td className="text-end">{formatearPrecio(producto.precio)}</td>
              <td className="text-center">
                {producto.stock === 0 ? <Badge bg="danger">Agotado</Badge> : producto.stock}
              </td>
              <td className="text-center">{producto.destacado ? '★' : '—'}</td>
              <td className="text-end text-nowrap">
                <Button as={Link} to={`/admin/producto/${producto.id}`} variant="outline-dark" size="sm" className="me-2">
                  Editar
                </Button>
                <Button variant="outline-danger" size="sm" onClick={() => handleEliminar(producto)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </main>
  )
}

export default AdminProductos
