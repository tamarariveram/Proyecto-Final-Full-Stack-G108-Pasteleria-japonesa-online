import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'
import { useProductos } from '../hooks/useProductos'
import { avisoExito } from '../utils/alertas'
import { formatearPrecio } from '../utils/formato'

const formularioVacio = {
  nombre: '',
  descripcion: '',
  precio: '',
  stock: '',
  imagen_url: '',
  categoria_id: '',
  destacado: false,
}

const aFormulario = (producto) => ({
  nombre: producto.nombre,
  descripcion: producto.descripcion,
  precio: String(producto.precio),
  stock: String(producto.stock),
  imagen_url: producto.imagen_url,
  categoria_id: producto.categoria.id,
  destacado: producto.destacado,
})

const esEnteroValido = (valor, minimo) => valor !== '' && Number.isInteger(Number(valor)) && Number(valor) >= minimo

const FormProducto = () => {
  const { id } = useParams()
  const { categorias, obtenerProducto, crearProducto, actualizarProducto } = useProductos()
  const navigate = useNavigate()
  const inputNombre = useRef(null)
  const esEdicion = Boolean(id)
  const producto = esEdicion ? obtenerProducto(id) : null

  const [formulario, setFormulario] = useState(() => (producto ? aFormulario(producto) : formularioVacio))
  const [error, setError] = useState('')

  useEffect(() => {
    inputNombre.current?.focus()
  }, [])

  if (esEdicion && !producto) {
    return (
      <main className="container py-5 text-center">
        <h1 className="h3">Producto no encontrado</h1>
        <Button as={Link} to="/admin" variant="dark" className="mt-3">
          Volver al panel
        </Button>
      </main>
    )
  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormulario({ ...formulario, [name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const { nombre, descripcion, precio, stock, imagen_url, categoria_id } = formulario

    if (!nombre.trim() || !descripcion.trim() || !imagen_url.trim() || !categoria_id) {
      setError('Completa todos los campos')
      return
    }

    if (!esEnteroValido(precio, 1)) {
      setError('El precio debe ser un número entero mayor a 0')
      return
    }

    if (!esEnteroValido(stock, 0)) {
      setError('El stock debe ser un número entero igual o mayor a 0')
      return
    }

    const datos = {
      ...formulario,
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      imagen_url: imagen_url.trim(),
      precio: Number(precio),
      stock: Number(stock),
    }

    if (esEdicion) {
      actualizarProducto(id, datos)
      avisoExito('Producto actualizado')
    } else {
      crearProducto(datos)
      avisoExito('Producto creado')
    }

    navigate('/admin')
  }

  return (
    <main className="container py-5">
      <Link to="/admin" className="text-dark">
        ← Volver al panel
      </Link>
      <h1 className="mt-3 mb-4">{esEdicion ? 'Editar producto' : 'Nuevo producto'}</h1>
      <Row className="g-4">
        <Col lg={8}>
          <Card className="card-producto">
            <Card.Body className="p-4">
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-3" controlId="producto-nombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control ref={inputNombre} name="nombre" value={formulario.nombre} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="producto-descripcion">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control as="textarea" rows={3} name="descripcion" value={formulario.descripcion} onChange={handleChange} />
                </Form.Group>
                <Row>
                  <Col sm={6}>
                    <Form.Group className="mb-3" controlId="producto-precio">
                      <Form.Label>Precio (CLP)</Form.Label>
                      <Form.Control type="number" min="1" name="precio" value={formulario.precio} onChange={handleChange} />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group className="mb-3" controlId="producto-stock">
                      <Form.Label>Stock</Form.Label>
                      <Form.Control type="number" min="0" name="stock" value={formulario.stock} onChange={handleChange} />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3" controlId="producto-categoria">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Select name="categoria_id" value={formulario.categoria_id} onChange={handleChange}>
                    <option value="">Elige una categoría</option>
                    {categorias.map((categoria) => (
                      <option key={categoria.id} value={categoria.id}>
                        {categoria.nombre}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="producto-imagen">
                  <Form.Label>URL de la imagen</Form.Label>
                  <Form.Control type="url" name="imagen_url" value={formulario.imagen_url} onChange={handleChange} placeholder="https://..." />
                </Form.Group>
                <Form.Check className="mb-4" type="switch" id="producto-destacado" name="destacado" label="Mostrar en destacados" checked={formulario.destacado} onChange={handleChange} />
                <div className="d-flex gap-2">
                  <Button type="submit" variant="dark" className="rounded-pill px-4">
                    {esEdicion ? 'Guardar cambios' : 'Crear producto'}
                  </Button>
                  <Button as={Link} to="/admin" variant="outline-dark" className="rounded-pill px-4">
                    Cancelar
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <h2 className="h6 text-muted mb-3">Vista previa</h2>
          <Card className="card-producto">
            {formulario.imagen_url ? (
              <Card.Img variant="top" src={formulario.imagen_url} alt={formulario.nombre} />
            ) : (
              <div className="preview-vacia">Sin imagen</div>
            )}
            <Card.Body>
              <div className="fw-semibold">{formulario.nombre || 'Nombre del producto'}</div>
              <div className="text-muted">{formatearPrecio(Number(formulario.precio) || 0)}</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </main>
  )
}

export default FormProducto
