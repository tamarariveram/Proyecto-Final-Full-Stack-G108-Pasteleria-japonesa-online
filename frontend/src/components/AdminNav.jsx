import { NavLink } from 'react-router-dom'
import { Nav } from 'react-bootstrap'

const AdminNav = () => {
  return (
    <Nav variant="tabs" className="mb-4 admin-nav">
      <Nav.Item>
        <Nav.Link as={NavLink} to="/admin" end>
          Productos
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/admin/pedidos">
          Pedidos
        </Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default AdminNav
