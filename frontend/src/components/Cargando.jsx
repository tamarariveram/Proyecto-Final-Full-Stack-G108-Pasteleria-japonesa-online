import { Spinner } from 'react-bootstrap'

const Cargando = () => {
  return (
    <div className="text-center py-5">
      <Spinner animation="border" className="text-success mb-3" role="status" />
      <p className="mb-1">Preparando la vitrina...</p>
      <p className="small text-muted">La primera vez puede tardar hasta un minuto mientras el servidor despierta.</p>
    </div>
  )
}

export default Cargando
