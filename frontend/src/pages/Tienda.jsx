import { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import ProductCard from '../components/ProductCard'
import CategoryFilter from '../components/CategoryFilter'
import { useProductos } from '../hooks/useProductos'

const Tienda = () => {
  const [categoriaActiva, setCategoriaActiva] = useState('Todas')
  const { productos, categorias } = useProductos()

  const productosFiltrados =
    categoriaActiva === 'Todas'
      ? productos
      : productos.filter((producto) => producto.categoria.nombre === categoriaActiva)

  return (
    <main className="container py-5">
      <h1>Tienda</h1>
      <Row className="mt-4 g-4">
        <Col lg={3}>
          <h2 className="h6 text-muted mb-3">Categorías</h2>
          <CategoryFilter
            categorias={categorias}
            categoriaActiva={categoriaActiva}
            onSeleccionar={setCategoriaActiva}
          />
        </Col>
        <Col lg={9}>
          <p className="text-muted">
            {productosFiltrados.length} {productosFiltrados.length === 1 ? 'producto' : 'productos'}
          </p>
          <Row xs={1} sm={2} xl={3} className="g-4">
            {productosFiltrados.map((producto) => (
              <Col key={producto.id}>
                <ProductCard producto={producto} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </main>
  )
}

export default Tienda
