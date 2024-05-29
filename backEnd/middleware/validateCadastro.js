const Joi = require('joi');
const validator = require('validator');

const cadastroSchema = Joi.object({
  nome: Joi.string().min(3).max(100).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } }).required(),
  senha: Joi.string().min(6).max(100).required(),
  tipo: Joi.string().valid('aluno', 'professor', 'administrador').required(),
  cpf: Joi.string().pattern(new RegExp(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)).required(),
  dataNascimento: Joi.date().less('now').required(),
  endereco: Joi.string().min(10).max(255).required(),
  telefone: Joi.string().custom((value, helpers) => {
    if (!validator.isMobilePhone(value, 'pt-BR')) {
      return helpers.error('any.invalid');
    }
    return value;
  }).required(),
});

const validateCadastro = (req, res, next) => {
  const { error } = cadastroSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ errors: error.details.map(err => ({
      type: 'field',
      value: err.context.value,
      msg: err.message,
      path: err.path.join('.'),
      location: 'body'
    })) });
  }

  next();
};

module.exports = validateCadastro;
