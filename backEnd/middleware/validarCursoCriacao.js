const Joi = require('joi');
const Curso = require('../models/Curso');

const cursoCriacaoSchema = Joi.object({
  nomeCurso: Joi.string().required(),
  descricao: Joi.string().required(),
  categoria: Joi.string().required(),
  preco: Joi.number().positive().required(),
  professorId: Joi.number().integer().positive().required()
});

const validarCursoCriacao = async (req, res, next) => {
  try {
    // Validar os campos do curso
    const { error } = cursoCriacaoSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ mensagem: error.details[0].message });
    }

    // Verificar se o professor associado ao curso existe
    const professor = await Usuario.findByPk(req.body.professorId);
    if (!professor) {
      return res.status(404).json({ mensagem: 'Professor não encontrado' });
    }

    // Prosseguir para o próximo middleware se os campos estiverem válidos e o professor existir
    next();
  } catch (error) {
    // Se ocorrer algum erro durante o processo, retornar um erro interno do servidor
    console.error('Erro ao validar curso:', error);
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

module.exports = validarCursoCriacao;
