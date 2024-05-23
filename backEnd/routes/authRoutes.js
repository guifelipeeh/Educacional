
const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');
const validateLogin = require('../middleware/validateLogin');

// Rota de login
router.post('/login',validateLogin, authController.login);

// Outras rotas de autenticação
router.post('/register', authController.registrar);
router.post('/logout', authController.logout);

module.exports = router;
