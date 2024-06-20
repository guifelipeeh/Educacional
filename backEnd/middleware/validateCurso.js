const Curso = require('../models/Curso');

const validarCurso = async (req, res, next) => {
  try {
    const cursoId = req.body.cursoId || req.params.cursoId || req.params.id;

    if (cursoId) {
      const curso = await Curso.findByPk(cursoId);

      if (!curso) {
        return res.status(404).json({ error: 'Curso não encontrado' });
      }
    }

    const usuario = req.usuario;

    if (!usuario) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    if (usuario.tipo !== 'professor' && usuario.tipo !== 'admin') {
      return res.status(403).json({ error: 'Apenas professores e administradores podem acessar este curso' });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao validar o curso' });
  }
};

module.exports = validarCurso;
