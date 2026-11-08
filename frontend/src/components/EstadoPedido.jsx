import { Badge } from 'react-bootstrap'

const estilos = {
  pendiente: { bg: 'warning', text: 'dark' },
  pagado: { bg: 'info', text: 'dark' },
  entregado: { bg: 'success', text: 'light' },
}

const EstadoPedido = ({ estado }) => {
  const { bg, text } = estilos[estado] || { bg: 'secondary', text: 'light' }

  return (
    <Badge bg={bg} text={text} className="text-capitalize">
      {estado}
    </Badge>
  )
}

export default EstadoPedido
