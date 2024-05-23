const Curso = require('../models/Curso');

class CursoService {
  static async criarCurso(dados) {
    return await Curso.create(dados);
  }

  static async obterCursos() {
    return await Curso.findAll();
  }

  static async obterCursoPorId(id) {
    return await Curso.findByPk(id);
  }

  static async atualizarCurso(id, dados) {
    const curso = await Curso.findByPk(id);
    if (curso) {
      await curso.update(dados);
      return curso;
    }
    return null;
  }

  static async deletarCurso(id) {
    const curso = await Curso.findByPk(id);
    if (curso) {
      await curso.destroy();
      return curso;
    }
    return null;
  }
}

module.exports = CursoService;
