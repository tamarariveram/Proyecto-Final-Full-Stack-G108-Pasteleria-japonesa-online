import { Row, Col } from 'react-bootstrap'
import ProductCard from '../components/ProductCard'
import { productos } from '../data/productos'

const Tienda = () => {
  return (
    <main className="container py-5">
      <h1>Tienda</h1>
      <p className="text-muted mb-4">{productos.length} productos</p>
      <Row xs={1} sm={2} lg={3} className="g-4">
        {productos.map((producto) => (
          <Col key={producto.id}>
            <ProductCard producto={producto} />
          </Col>
        ))}
      </Row>
    </main>
  )
}

export default Tienda
