const express = require('express');
const router = express.Router();

const { criar, entrar, renovar, remover } = require('../controllers/usuariosController');
const { verificarToken } = require('../middlewares/authMiddleware');

router.post('/', criar);
router.post('/login', entrar);
router.post('/renovar', verificarToken, renovar);
router.delete('/', verificarToken, remover);

module.exports = router;
