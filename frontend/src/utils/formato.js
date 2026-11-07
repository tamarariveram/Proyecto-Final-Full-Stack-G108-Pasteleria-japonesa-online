export const formatearPrecio = (precio) => {
  return `$${precio.toLocaleString('es-CL')}`
}

export const formatearFecha = (fecha) => {
  return new Date(fecha).toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' })
}

export const obtenerIniciales = (nombre) => {
  return nombre
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((palabra) => palabra[0].toUpperCase())
    .join('')
}
