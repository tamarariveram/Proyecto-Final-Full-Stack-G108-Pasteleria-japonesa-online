import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'
import { useCart } from '../hooks/useCart'

const formularioInicial = { nombre: '', email: '', password: '', confirmar: '' }

const Registro = () => {
  const [formulario, setFormulario] = useState(formularioInicial)
  const [error, setError] = useState('')
  const { registrar } = useAuth()
  const { cantidadTotal } = useCart()
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormulario({ ...formulario, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const { nombre, email, password, confirmar } = formulario

    if (!nombre.trim() || !email.trim() || !password) {
      setError('Completa todos los campos')
      return
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Ingresa un correo válido')
      return
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    if (password !== confirmar) {
      setError('Las contraseñas no coinciden')
      return
    }

    const resultado = registrar(nombre, email, password)

    if (!resultado.ok) {
      setError(resultado.mensaje)
      return
    }

    if (cantidadTotal > 0) {
      navigate('/carrito')
    } else {
      navigate('/perfil')
    }
  }

  return (
    <main className="container py-5">
      <Card className="card-producto mx-auto form-kashi">
        <Card.Body className="p-4">
          <h1 className="h3 mb-4 text-center">Crea tu cuenta</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3" controlId="registro-nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control name="nombre" value={formulario.nombre} onChange={handleChange} autoComplete="name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="registro-email">
              <Form.Label>Correo</Form.Label>
              <Form.Control type="email" name="email" value={formulario.email} onChange={handleChange} autoComplete="email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="registro-password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" name="password" value={formulario.password} onChange={handleChange} autoComplete="new-password" />
            </Form.Group>
            <Form.Group className="mb-4" controlId="registro-confirmar">
              <Form.Label>Repite la contraseña</Form.Label>
              <Form.Control type="password" name="confirmar" value={formulario.confirmar} onChange={handleChange} autoComplete="new-password" />
            </Form.Group>
            <Button type="submit" variant="dark" className="w-100 rounded-pill">
              Crear cuenta
            </Button>
          </Form>
          <p className="text-center mt-3 mb-0">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </Card.Body>
      </Card>
    </main>
  )
}

export default Registro
