// routes/usuarioRoutes.js

const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middleware/authMiddleware');
const middlewareCadastro = require('../middleware/validateCadastro');


// Rota para obter o perfil do usuário
router.get('/perfil', authMiddleware, usuarioController.obterPerfilUsuario);

// Rota para atualizar o perfil do usuário
router.put('/perfil',authMiddleware, middlewareCadastro, usuarioController.atualizarPerfilUsuario);

// Rota para deletar o perfil do usuário
router.delete('/perfil', authMiddleware, usuarioController.deletarPerfilUsuario);

module.exports = router;
