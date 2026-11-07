import { Link, NavLink } from 'react-router-dom'
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap'
import { useCart } from '../hooks/useCart'

const Header = () => {
  const { cantidadTotal } = useCart()

  return (
    <Navbar expand="md" sticky="top" className="header-kashi">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          KASHI 菓子
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="menu-principal" />
        <Navbar.Collapse id="menu-principal">
          <Nav className="mx-auto">
            <Nav.Link as={NavLink} to="/" end>
              Inicio
            </Nav.Link>
            <Nav.Link as={NavLink} to="/tienda">
              Tienda
            </Nav.Link>
          </Nav>
          <div className="d-flex align-items-center gap-2">
            <Button as={Link} to="/login" variant="outline-dark" size="sm">
              Ingresar
            </Button>
            <Button as={Link} to="/carrito" variant="dark" size="sm">
              🛒 <Badge bg="light" text="dark">{cantidadTotal}</Badge>
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
