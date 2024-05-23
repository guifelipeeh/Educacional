const CursoService = require('../services/cursoService');

exports.criarCurso = async (req, res) => {
  try {
    const curso = await CursoService.criarCurso(req.body);
    res.status(201).json(curso);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obterCursos = async (req, res) => {
  try {
    const cursos = await CursoService.obterCursos();
    res.status(200).json(cursos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obterCursoPorId = async (req, res) => {
  try {
    const curso = await CursoService.obterCursoPorId(req.params.id);
    if (curso) {
      res.status(200).json(curso);
    } else {
      res.status(404).json({ error: 'Curso não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.atualizarCurso = async (req, res) => {
  try {
    const curso = await CursoService.atualizarCurso(req.params.id, req.body);
    if (curso) {
      res.status(200).json(curso);
    } else {
      res.status(404).json({ error: 'Curso não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletarCurso = async (req, res) => {
  try {
    const curso = await CursoService.deletarCurso(req.params.id);
    if (curso) {
      res.status(200).json({ message: 'Curso deletado com sucesso' });
    } else {
      res.status(404).json({ error: 'Curso não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
