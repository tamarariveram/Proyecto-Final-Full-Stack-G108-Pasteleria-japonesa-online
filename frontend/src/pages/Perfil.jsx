import { Link } from 'react-router-dom'
import { Row, Col, Card, Table, Button } from 'react-bootstrap'
import EstadoPedido from '../components/EstadoPedido'
import { useAuth } from '../hooks/useAuth'
import { usePedidos } from '../hooks/usePedidos'
import { formatearPrecio, formatearFecha, obtenerIniciales } from '../utils/formato'

const Perfil = () => {
  const { usuario } = useAuth()
  const { pedidosDe } = usePedidos()
  const misPedidos = pedidosDe(usuario.id)

  return (
    <main className="container py-5">
      <h1 className="mb-4">Mi perfil</h1>
      <Row className="g-4">
        <Col lg={4}>
          <Card className="card-producto text-center">
            <Card.Body className="p-4">
              <div className="avatar-kashi mx-auto mb-3">{obtenerIniciales(usuario.nombre)}</div>
              <h2 className="h5 mb-1">{usuario.nombre}</h2>
              <p className="text-muted mb-2">{usuario.email}</p>
              <span className="small text-capitalize">{usuario.rol}</span>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={8}>
          <h2 className="h4 mb-3">Mis pedidos</h2>
          {misPedidos.length === 0 ? (
            <div className="text-center border rounded p-5">
              <p className="text-muted mb-3">Todavía no has hecho ningún pedido.</p>
              <Button as={Link} to="/tienda" variant="dark" className="rounded-pill px-4">
                Ir a la tienda
              </Button>
            </div>
          ) : (
            <Table responsive hover className="align-middle tabla-kashi">
              <thead>
                <tr>
                  <th>Pedido</th>
                  <th>Fecha</th>
                  <th>Productos</th>
                  <th className="text-end">Total</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {misPedidos.map((pedido) => (
                  <tr key={pedido.id}>
                    <td className="font-monospace small">#{pedido.id.slice(0, 8)}</td>
                    <td className="text-nowrap">{formatearFecha(pedido.created_at)}</td>
                    <td className="small">
                      {pedido.items.map((item) => (
                        <div key={item.producto_id}>
                          {item.cantidad} × {item.nombre}
                        </div>
                      ))}
                    </td>
                    <td className="text-end fw-bold">{formatearPrecio(pedido.total)}</td>
                    <td>
                      <EstadoPedido estado={pedido.estado} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </main>
  )
}

export default Perfil
