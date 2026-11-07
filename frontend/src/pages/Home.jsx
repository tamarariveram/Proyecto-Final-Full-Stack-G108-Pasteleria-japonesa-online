import { Link } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap'
import ProductCard from '../components/ProductCard'
import { productos } from '../data/productos'

const Home = () => {
  const destacados = productos.filter((producto) => producto.destacado)

  return (
    <main className="container py-5">
      <section className="py-5">
        <p className="text-muted mb-2">和菓子 · Pastelería japonesa artesanal</p>
        <h1 className="display-4 fw-semibold">Dulces japoneses hechos a mano</h1>
        <Button as={Link} to="/tienda" variant="dark" className="mt-3">
          Ver tienda
        </Button>
      </section>

      <section className="py-4">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <h2 className="h3 mb-0">Destacados</h2>
          <Button as={Link} to="/tienda" variant="outline-dark" size="sm">
            Ver todos
          </Button>
        </div>
        <Row xs={1} sm={2} lg={4} className="g-4">
          {destacados.map((producto) => (
            <Col key={producto.id}>
              <ProductCard producto={producto} />
            </Col>
          ))}
        </Row>
      </section>
    </main>
  )
}

export default Home
