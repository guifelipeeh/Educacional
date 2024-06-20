// controllers/cursoController.js
const CursoService = require('../services/cursoService');

class CursoController {
  static async criarCurso(req, res) {
    try {
      const curso = await CursoService.criarCurso(req.body);
      res.status(201).json(curso);
    } catch (error) {
      res.status(400).json({ mensagem: error.message });
    }
  }

  static async obterCursos(req, res) {
    try {
      const cursos = await CursoService.obterCursos();
      res.status(200).json(cursos);
    } catch (error) {
      res.status(500).json({ mensagem: error.message });
    }
  }

  static async obterCursoPorId(req, res) {
    try {
      const curso = await CursoService.obterCursoPorId(req.params.id);
      if (!curso) {
        return res.status(404).json({ mensagem: 'Curso não encontrado' });
      }
      res.status(200).json(curso);
    } catch (error) {
      res.status(500).json({ mensagem: error.message });
    }
  }

  static async atualizarCurso(req, res) {
    try {
      const curso = await CursoService.atualizarCurso(req.params.id, req.body);
      if (!curso) {
        return res.status(404).json({ mensagem: 'Curso não encontrado' });
      }
      res.status(200).json(curso);
    } catch (error) {
      res.status(400).json({ mensagem: error.message });
    }
  }

  static async deletarCurso(req, res) {
    try {
      const curso = await CursoService.deletarCurso(req.params.id);
      if (!curso) {
        return res.status(404).json({ mensagem: 'Curso não encontrado' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ mensagem: error.message });
    }
  }
}

module.exports = CursoController;
