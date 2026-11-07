import Swal from 'sweetalert2'

const toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
})

export const avisoAgregado = (nombre) => {
  toast.fire({ icon: 'success', title: `${nombre} se agregó al carrito` })
}

export const avisoSinStock = () => {
  toast.fire({ icon: 'warning', title: 'Ya tienes en el carrito todo el stock disponible' })
}
