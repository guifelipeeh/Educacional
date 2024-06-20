const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');
const validateLogin = require('../middleware/validateLogin');
const validateCadastro = require('../middleware/validateCadastro');
const authMiddleware = require('../middleware/authMiddleware'); // Importe o middleware authMiddleware


router.post('/login', validateLogin, authController.login);


router.post('/register', validateCadastro, authController.registrar);


router.post('/logout', authMiddleware, authController.logout); // Use o authMiddleware em vez de validateToken


router.post('/recover', authController.recoverPasswordOrUsername);


router.post('/reset',authMiddleware, authController.resetPassword);

module.exports = router;
