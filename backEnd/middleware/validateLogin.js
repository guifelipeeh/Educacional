// middlewares/validateLogin.js

const { body, validationResult } = require('express-validator');

const validateLogin = [
  // Verificar se o email é fornecido e está no formato correto
  body('email')
    .isEmail()
    .withMessage('Email inválido')
    .notEmpty()
    .withMessage('O campo email é obrigatório'),

  // Verificar se a senha é fornecida e tem pelo menos 6 caracteres
  body('senha')
    .isLength({ min: 6 })
    .withMessage('A senha deve ter pelo menos 6 caracteres')
    .notEmpty()
    .withMessage('O campo senha é obrigatório'),

  // Manipulador de erros de validação
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validateLogin;
