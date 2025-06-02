const Joi = require('joi');
const validator = require('validator');

const isValidCPF = (cpf) => {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let add = 0;
  for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
  let rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(9))) return false;

  add = 0;
  for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(10))) return false;

  return true;
};

const cadastroSchema = Joi.object({
  nome: Joi.string().min(3).max(100).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } }).required(),
  senha: Joi.string().min(6).max(100).required(),
  tipo: Joi.string().valid('aluno', 'professor', 'admin').required(),
  cpf: Joi.string().custom((value, helpers) => {
    if (!isValidCPF(value)) {
      return helpers.message('CPF inválido');
    }
    return value;
  }).required(),
  dataNascimento: Joi.date().iso().required(),
  endereco: Joi.string().min(10).max(255).required(),
  telefone: Joi.string().custom((value, helpers) => {
    if (!validator.isMobilePhone(value, 'pt-BR')) {
      return helpers.message('Formato de telefone inválido');
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

  console.log("Validação passou:", req.body);
  next();
};

module.exports = validateCadastro;
