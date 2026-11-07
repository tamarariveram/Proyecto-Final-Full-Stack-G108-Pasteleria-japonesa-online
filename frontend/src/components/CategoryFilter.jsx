import { Button } from 'react-bootstrap'

const CategoryFilter = ({ categorias, categoriaActiva, onSeleccionar }) => {
  const opciones = ['Todas', ...categorias.map((categoria) => categoria.nombre)]

  return (
    <div className="d-flex flex-wrap flex-lg-column gap-2">
      {opciones.map((opcion) => (
        <Button
          key={opcion}
          variant={opcion === categoriaActiva ? 'dark' : 'outline-dark'}
          size="sm"
          className="text-start"
          onClick={() => onSeleccionar(opcion)}
        >
          {opcion}
        </Button>
      ))}
    </div>
  )
}

export default CategoryFilter
