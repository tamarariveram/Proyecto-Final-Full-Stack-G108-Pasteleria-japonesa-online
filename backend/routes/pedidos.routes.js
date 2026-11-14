const { Router } = require('express')
const { crear, misPedidos, todos, cambiarEstado } = require('../controllers/pedidos.controller')
const { validarToken, esAdmin } = require('../middlewares/auth.middleware')
const { validarItems, validarEstado } = require('../middlewares/pedidos.middleware')

const router = Router()

router.post('/', validarToken, validarItems, crear)
router.get('/mis-pedidos', validarToken, misPedidos)
router.get('/', validarToken, esAdmin, todos)
router.patch('/:id/estado', validarToken, esAdmin, validarEstado, cambiarEstado)

module.exports = router
