import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'
import { useCart } from '../hooks/useCart'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const { cantidadTotal } = useCart()
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!email || !password) {
      setError('Completa tu correo y contraseña')
      return
    }

    const resultado = login(email, password)

    if (!resultado.ok) {
      setError(resultado.mensaje)
      return
    }

    if (resultado.usuario.rol === 'admin') {
      navigate('/admin')
    } else if (cantidadTotal > 0) {
      navigate('/carrito')
    } else {
      navigate('/perfil')
    }
  }

  return (
    <main className="container py-5">
      <Card className="card-producto mx-auto form-kashi">
        <Card.Body className="p-4">
          <h1 className="h3 mb-4 text-center">Iniciar sesión</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3" controlId="login-email">
              <Form.Label>Correo</Form.Label>
              <Form.Control type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" />
            </Form.Group>
            <Form.Group className="mb-4" controlId="login-password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" />
            </Form.Group>
            <Button type="submit" variant="dark" className="w-100 rounded-pill">
              Ingresar
            </Button>
          </Form>
          <p className="text-center mt-3 mb-0">
            ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
          </p>
          <div className="small text-muted border-top mt-4 pt-3">
            <div className="fw-semibold mb-1">Cuentas de prueba</div>
            <div>Cliente: tamara@correo.cl / MiClave123</div>
            <div>Admin: admin@kashi.cl / Admin123</div>
          </div>
        </Card.Body>
      </Card>
    </main>
  )
}

export default Login
