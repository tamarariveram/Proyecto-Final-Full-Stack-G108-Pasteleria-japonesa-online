import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className="footer-kashi py-4">
      <Container className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
        <span className="fw-bold">KASHI 菓子</span>
        <nav className="d-flex gap-3">
          <Link to="/">Inicio</Link>
          <Link to="/tienda">Tienda</Link>
          <Link to="/perfil">Mi cuenta</Link>
        </nav>
        <small>© 2026 Kashi · Pastelería japonesa</small>
      </Container>
    </footer>
  )
}

export default Footer
