import { Link } from 'react-router-dom'
import { Card, Button, Badge } from 'react-bootstrap'
import { formatearPrecio } from '../utils/formato'
import { useCart } from '../hooks/useCart'
import { avisoAgregado, avisoSinStock } from '../utils/alertas'

const ProductCard = ({ producto }) => {
  const { id, nombre, precio, imagen_url, stock, categoria } = producto
  const agotado = stock === 0
  const { agregarAlCarrito } = useCart()

  const handleAgregar = () => {
    if (agregarAlCarrito(producto)) {
      avisoAgregado(nombre)
    } else {
      avisoSinStock()
    }
  }

  return (
    <Card className="h-100 card-producto">
      <Link to={`/producto/${id}`}>
        <Card.Img variant="top" src={imagen_url} alt={nombre} />
      </Link>
      <Card.Body className="d-flex flex-column">
        <small className="text-muted">{categoria.nombre}</small>
        <Link to={`/producto/${id}`} className="card-producto-nombre">
          {nombre}
        </Link>
        <div className="d-flex justify-content-between align-items-center mt-auto pt-2">
          <span className="fw-bold">{formatearPrecio(precio)}</span>
          {agotado ? (
            <Badge bg="secondary">Agotado</Badge>
          ) : (
            <Button variant="dark" size="sm" className="rounded-circle" onClick={handleAgregar} aria-label={`Agregar ${nombre} al carrito`}>
              +
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
