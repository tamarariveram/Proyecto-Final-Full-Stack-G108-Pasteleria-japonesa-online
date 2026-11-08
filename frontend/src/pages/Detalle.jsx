import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Row, Col, Button, Badge, Image } from 'react-bootstrap'
import ProductCard from '../components/ProductCard'
import AgregarAlCarrito from '../components/AgregarAlCarrito'
import { useProductos } from '../hooks/useProductos'
import { formatearPrecio } from '../utils/formato'

const Detalle = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { productos, obtenerProducto } = useProductos()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  const producto = obtenerProducto(id)

  if (!producto) {
    return (
      <main className="container py-5 text-center">
        <h1 className="h3">Producto no encontrado</h1>
        <p className="text-muted mb-4">Puede que ya no esté en la vitrina.</p>
        <Button as={Link} to="/tienda" variant="dark">
          Ir a la tienda
        </Button>
      </main>
    )
  }

  const { nombre, descripcion, precio, imagen_url, stock, categoria } = producto
  const relacionados = productos.filter((item) => item.id !== id).slice(0, 4)

  return (
    <main className="container py-5">
      <Button variant="link" className="p-0 mb-4 text-dark" onClick={() => navigate(-1)}>
        ← Volver
      </Button>

      <Row className="g-5">
        <Col md={6}>
          <Image src={imagen_url} alt={nombre} fluid rounded className="imagen-detalle" />
        </Col>
        <Col md={6}>
          <Badge bg="light" text="dark" className="border mb-3">
            {categoria.nombre}
          </Badge>
          <h1 className="h2">{nombre}</h1>
          <p className="fs-3 fw-semibold">{formatearPrecio(precio)}</p>
          <p>{descripcion}</p>
          <p className="text-muted small mb-4">
            {stock === 0 ? 'Sin stock por ahora' : `${stock} unidades disponibles`}
          </p>
          <AgregarAlCarrito key={id} producto={producto} />
        </Col>
      </Row>

      <section className="mt-5 pt-4">
        <h2 className="h4 mb-4">También te puede gustar</h2>
        <Row xs={1} sm={2} lg={4} className="g-4">
          {relacionados.map((item) => (
            <Col key={item.id}>
              <ProductCard producto={item} />
            </Col>
          ))}
        </Row>
      </section>
    </main>
  )
}

export default Detalle
