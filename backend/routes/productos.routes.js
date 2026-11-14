const { Router } = require('express')
const { listarProductos, verProducto } = require('../controllers/productos.controller')

const router = Router()

router.get('/', listarProductos)
router.get('/:id', verProducto)

module.exports = router
