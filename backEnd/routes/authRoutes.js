const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');
const validateLogin = require('../middleware/validateLogin');
const validateCadastro = require('../middleware/validateCadastro');
const validateToken = require('../middleware/validateToken');

// Rota de login
router.post('/login', validateLogin, authController.login);

// Rota de registro
router.post('/register', validateCadastro, authController.registrar);

// Rota de logout
router.post('/logout', validateToken, authController.logout);

// Rota de recuperação de senha ou nome de usuário
router.post('/recover', authController.recoverPasswordOrUsername);

// Rota de redefinição de senha
router.post('/reset', authController.resetPassword);

module.exports = router;
