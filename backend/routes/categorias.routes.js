const { Router } = require('express')
const { listarCategorias } = require('../controllers/categorias.controller')

const router = Router()

router.get('/', listarCategorias)

module.exports = router
