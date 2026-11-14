const { Router } = require('express')
const { registrar, login, perfil } = require('../controllers/auth.controller')
const { validarCredenciales, validarToken } = require('../middlewares/auth.middleware')

const router = Router()

router.post('/register', registrar)
router.post('/login', validarCredenciales, login)
router.get('/me', validarToken, perfil)

module.exports = router
