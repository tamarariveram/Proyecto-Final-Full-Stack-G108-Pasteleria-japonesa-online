import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, Card, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import CartItem from '../components/CartItem'
import { useCart } from '../hooks/useCart'
import { useAuth } from '../hooks/useAuth'
import { formatearPrecio } from '../utils/formato'

const Carrito = () => {
  const { carrito, total, cantidadTotal, vaciarCarrito } = useCart()
  const { usuario } = useAuth()
  const navigate = useNavigate()

  const handleVaciar = async () => {
    const respuesta = await Swal.fire({
      title: '¿Vaciar el carrito?',
      text: 'Se quitarán todos los productos.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, vaciar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#2f4a3a',
    })

    if (respuesta.isConfirmed) {
      vaciarCarrito()
    }
  }

  const handlePagar = async () => {
    if (!usuario) {
      navigate('/login', { state: { desde: '/carrito' } })
      return
    }

    const respuesta = await Swal.fire({
      title: 'Confirmar pedido',
      text: `Total a pagar: ${formatearPrecio(total)}`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Seguir comprando',
      confirmButtonColor: '#2f4a3a',
    })

    if (respuesta.isConfirmed) {
      vaciarCarrito()
      await Swal.fire({
        title: '¡Gracias por tu compra!',
        text: 'Tu pedido quedó registrado.',
        icon: 'success',
        confirmButtonColor: '#2f4a3a',
      })
      navigate('/perfil')
    }
  }

  if (carrito.length === 0) {
    return (
      <main className="container py-5 text-center">
        <h1 className="mb-3">Tu carrito está vacío</h1>
        <p className="text-muted mb-4">Aún no has elegido ningún dulce.</p>
        <Button as={Link} to="/tienda" variant="dark" className="rounded-pill px-4">
          Ir a la tienda
        </Button>
      </main>
    )
  }

  return (
    <main className="container py-5">
      <h1 className="mb-4">Tu carrito</h1>
      <Row className="g-4">
        <Col lg={8}>
          {carrito.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <Button variant="link" className="text-muted mt-2 px-0" onClick={handleVaciar}>
            Vaciar carrito
          </Button>
        </Col>
        <Col lg={4}>
          <Card className="card-producto">
            <Card.Body>
              <h2 className="h5 mb-3">Resumen</h2>
              <div className="d-flex justify-content-between mb-2">
                <span>Productos</span>
                <span>{cantidadTotal}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Envío</span>
                <span className="text-muted">Por calcular</span>
              </div>
              <div className="d-flex justify-content-between fw-bold fs-5 border-top pt-3 mb-3">
                <span>Total</span>
                <span>{formatearPrecio(total)}</span>
              </div>
              <Button variant="dark" className="w-100 rounded-pill" onClick={handlePagar}>
                Pagar
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </main>
  )
}

export default Carrito
