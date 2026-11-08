import { useState } from 'react'
import { Table, Button, Form } from 'react-bootstrap'
import AdminNav from '../components/AdminNav'
import { usePedidos } from '../hooks/usePedidos'
import { avisoExito } from '../utils/alertas'
import { estadosPedido } from '../utils/constantes'
import { formatearPrecio, formatearFecha } from '../utils/formato'

const AdminPedidos = () => {
  const { pedidos, cambiarEstado } = usePedidos()
  const [filtro, setFiltro] = useState('todos')

  const ordenados = [...pedidos].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  const visibles = filtro === 'todos' ? ordenados : ordenados.filter((pedido) => pedido.estado === filtro)
  const totalVisible = visibles.reduce((suma, pedido) => suma + pedido.total, 0)

  const contar = (estado) => (estado === 'todos' ? pedidos.length : pedidos.filter((pedido) => pedido.estado === estado).length)

  const handleEstado = (id, estado) => {
    cambiarEstado(id, estado)
    avisoExito(`Pedido marcado como ${estado}`)
  }

  return (
    <main className="container py-5">
      <h1 className="mb-3">Panel admin</h1>
      <AdminNav />
      <div className="d-flex flex-wrap gap-2 mb-3">
        {['todos', ...estadosPedido].map((estado) => (
          <Button key={estado} variant={filtro === estado ? 'dark' : 'outline-dark'} size="sm" className="rounded-pill text-capitalize" onClick={() => setFiltro(estado)}>
            {estado} ({contar(estado)})
          </Button>
        ))}
      </div>
      <p className="text-muted">
        {visibles.length} {visibles.length === 1 ? 'pedido' : 'pedidos'} · {formatearPrecio(totalVisible)}
      </p>
      {visibles.length === 0 ? (
        <p className="text-center text-muted border rounded p-5">No hay pedidos con este estado.</p>
      ) : (
        <Table responsive hover className="align-middle tabla-kashi">
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Productos</th>
              <th className="text-end">Total</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {visibles.map((pedido) => (
              <tr key={pedido.id}>
                <td className="font-monospace small">#{pedido.id.slice(0, 8)}</td>
                <td className="text-nowrap">{formatearFecha(pedido.created_at)}</td>
                <td>
                  <div className="fw-semibold">{pedido.usuario.nombre}</div>
                  <div className="small text-muted">{pedido.usuario.email}</div>
                </td>
                <td className="small">
                  {pedido.items.map((item) => (
                    <div key={item.producto_id}>
                      {item.cantidad} × {item.nombre}
                    </div>
                  ))}
                </td>
                <td className="text-end fw-bold">{formatearPrecio(pedido.total)}</td>
                <td>
                  <Form.Select size="sm" className="text-capitalize select-estado" value={pedido.estado} onChange={(event) => handleEstado(pedido.id, event.target.value)} aria-label={`Estado del pedido ${pedido.id.slice(0, 8)}`}>
                    {estadosPedido.map((estado) => (
                      <option key={estado} value={estado}>
                        {estado}
                      </option>
                    ))}
                  </Form.Select>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </main>
  )
}

export default AdminPedidos
