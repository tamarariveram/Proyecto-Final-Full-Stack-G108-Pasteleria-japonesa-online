import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { formatearPrecio } from '../utils/formato'
import { useCart } from '../hooks/useCart'

const CartItem = ({ item }) => {
  const { id, nombre, precio, imagen_url, cantidad, stock } = item
  const { cambiarCantidad, quitarDelCarrito } = useCart()

  return (
    <div className="d-flex align-items-center gap-3 py-3 border-bottom">
      <Link to={`/producto/${id}`}>
        <img src={imagen_url} alt={nombre} className="carrito-img rounded" />
      </Link>
      <div className="flex-grow-1">
        <Link to={`/producto/${id}`} className="card-producto-nombre">
          {nombre}
        </Link>
        <div className="text-muted small">{formatearPrecio(precio)} c/u</div>
        <div className="d-flex align-items-center gap-3 mt-2">
          <div className="d-flex align-items-center border border-dark rounded-pill">
            <Button variant="link" size="sm" className="text-dark text-decoration-none" onClick={() => cambiarCantidad(id, cantidad - 1)} disabled={cantidad === 1} aria-label={`Disminuir cantidad de ${nombre}`}>
              −
            </Button>
            <span className="px-1">{cantidad}</span>
            <Button variant="link" size="sm" className="text-dark text-decoration-none" onClick={() => cambiarCantidad(id, cantidad + 1)} disabled={cantidad === stock} aria-label={`Aumentar cantidad de ${nombre}`}>
              +
            </Button>
          </div>
          <Button variant="link" size="sm" className="text-danger p-0" onClick={() => quitarDelCarrito(id)}>
            Quitar
          </Button>
        </div>
      </div>
      <span className="fw-bold">{formatearPrecio(precio * cantidad)}</span>
    </div>
  )
}

export default CartItem
