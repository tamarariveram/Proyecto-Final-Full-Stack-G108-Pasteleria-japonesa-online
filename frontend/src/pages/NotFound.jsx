import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const NotFound = () => {
  return (
    <main className="container py-5 text-center">
      <h1 className="display-1">404</h1>
      <p className="mb-4">Este dulce ya no está en la vitrina</p>
      <Button as={Link} to="/" variant="dark">
        Volver al inicio
      </Button>
    </main>
  )
}

export default NotFound
