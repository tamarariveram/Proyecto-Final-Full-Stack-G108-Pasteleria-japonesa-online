import { useState } from 'react'
import { Button } from 'react-bootstrap'

const AgregarAlCarrito = ({ producto }) => {
  const [cantidad, setCantidad] = useState(1)

  if (producto.stock === 0) {
    return (
      <Button variant="secondary" className="w-100" disabled>
        Agotado
      </Button>
    )
  }

  const disminuir = () => setCantidad((actual) => actual - 1)
  const aumentar = () => setCantidad((actual) => actual + 1)

  return (
    <div className="d-flex align-items-center gap-3">
      <div className="d-flex align-items-center border border-dark rounded-pill">
        <Button variant="link" className="text-dark text-decoration-none" onClick={disminuir} disabled={cantidad === 1} aria-label="Disminuir cantidad">
          −
        </Button>
        <span className="px-2">{cantidad}</span>
        <Button variant="link" className="text-dark text-decoration-none" onClick={aumentar} disabled={cantidad === producto.stock} aria-label="Aumentar cantidad">
          +
        </Button>
      </div>
      <Button variant="dark" className="flex-grow-1 rounded-pill">
        Agregar al carrito
      </Button>
    </div>
  )
}

export default AgregarAlCarrito
