const { Router } = require('express')
const { listarProductos, verProducto, crear, actualizar, eliminar } = require('../controllers/productos.controller')
const { validarToken, esAdmin } = require('../middlewares/auth.middleware')
const { validarProducto } = require('../middlewares/productos.middleware')

const router = Router()

router.get('/', listarProductos)
router.get('/:id', verProducto)
router.post('/', validarToken, esAdmin, validarProducto, crear)
router.put('/:id', validarToken, esAdmin, validarProducto, actualizar)
router.delete('/:id', validarToken, esAdmin, eliminar)

module.exports = router
