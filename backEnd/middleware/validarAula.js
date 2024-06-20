const Joi = require('joi');
const Curso = require('../models/Curso');
const Aula = require('../models/Aula');

// Schema de validação para os campos da aula
const aulaSchema = Joi.object({
  titulo: Joi.string().required(),
  descricao: Joi.string().required(),
  urlVideo: Joi.string().uri().required(),
  cursoId: Joi.number().integer().positive().required()
});

// Middleware para validar os campos da aula e verificar o vínculo com o curso
const validarAula = async (req, res, next) => {
  try {
    // Validar os campos da aula
    const { error } = aulaSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Verificar se o curso associado à aula existe

    const curso = await Curso.findByPk(req.body.cursoId);

    console.log(req.body);

    if (!curso) {
      return res.status(404).json({ error: 'Curso não encontrado' });
    }

    // Prosseguir para o próximo middleware se os campos estiverem válidos e o curso existir
    next();
  } catch (error) {
    // Se ocorrer algum erro durante o processo, retornar um erro interno do servidor
    console.error('Erro ao validar aula:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = validarAula;
