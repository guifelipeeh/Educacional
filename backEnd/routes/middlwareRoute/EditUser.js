const Joi = require('joi');

function tratarEdicaoUsuario(req, res, next) {
  const schema = Joi.object({
    nome: Joi.string().min(3).max(100).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } }).required(),
    senha: Joi.string().min(6).max(100).optional(), // Senha é opcional na edição
    cpf: Joi.string().pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/).optional(),
    dataNascimento: Joi.date().max('now').optional(),
    endereco: Joi.string().min(10).max(255).optional(),
    telefone: Joi.string().pattern(/^\(\d{2}\) \d{5}-\d{4}$/).optional() // Formato de telefone brasileiro (XX) XXXXX-XXXX
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ mensagem: error.details[0].message });
  }
  console.log("passoe no middleware de update");
  next();
}

module.exports = tratarEdicaoUsuario;
