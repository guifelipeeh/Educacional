const { body, validationResult } = require('express-validator');

const validateRecovery = [
  body('email').isEmail().withMessage('E-mail inválido.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validateRecovery;
