import { Link } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap'
import ProductCard from '../components/ProductCard'
import { useProductos } from '../hooks/useProductos'

const beneficios = [
  { icono: '🍡', titulo: 'Hecho a mano', texto: 'Cada wagashi se prepara en pequeñas tandas, todos los días.' },
  { icono: '🍵', titulo: 'Ingredientes de Japón', texto: 'Matcha de Uji, anko y harina de arroz glutinoso.' },
  { icono: '🎁', titulo: 'Listo para regalar', texto: 'Cajas de madera para compartir en ocasiones especiales.' },
]

const Home = () => {
  const { productos } = useProductos()
  const destacados = productos.filter((producto) => producto.destacado)

  return (
    <main className="container py-5">
      <section className="hero-kashi p-4 p-md-5">
        <Row className="align-items-center g-4">
          <Col md={7}>
            <p className="text-muted mb-2">和菓子 · Pastelería japonesa artesanal</p>
            <h1 className="display-4 fw-bold">Dulces japoneses hechos a mano</h1>
            <p className="lead my-4">Mochi, dorayaki, daifuku y té matcha para disfrutar sin apuro, como en una casa de té de Kioto.</p>
            <Button as={Link} to="/tienda" variant="dark" size="lg" className="rounded-pill px-4">
              Ver tienda
            </Button>
          </Col>
          <Col md={5} className="d-none d-md-flex justify-content-center">
            <div className="hero-sello">和</div>
          </Col>
        </Row>
      </section>

      <section className="py-5">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <h2 className="h3 mb-0">Destacados</h2>
          <Button as={Link} to="/tienda" variant="outline-dark" size="sm" className="rounded-pill">
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

      <section className="pb-4">
        <Row xs={1} md={3} className="g-4 text-center">
          {beneficios.map((beneficio) => (
            <Col key={beneficio.titulo}>
              <div className="beneficio-icono mb-2">{beneficio.icono}</div>
              <h3 className="h5">{beneficio.titulo}</h3>
              <p className="text-muted mb-0">{beneficio.texto}</p>
            </Col>
          ))}
        </Row>
      </section>
    </main>
  )
}

export default Home
