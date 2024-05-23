// routes/usuarioRoutes.js

const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middleware/authMiddleware');

// Rota para obter o perfil do usuário
router.get('/perfil', authMiddleware.validarJwt, usuarioController.obterPerfilUsuario);

// Rota para atualizar o perfil do usuário
router.put('/perfil', authMiddleware.validarJwt, usuarioController.atualizarPerfilUsuario);

// Rota para deletar o perfil do usuário
router.delete('/perfil', authMiddleware.validarJwt, usuarioController.deletarPerfilUsuario);

module.exports = router;
