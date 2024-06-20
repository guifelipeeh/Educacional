// services/cursoService.js
const Curso = require('../models/Curso');
const Usuario = require('../models/Usuario');

class CursoService {
  static async criarCurso(dados) {
    const { nomeCurso, descricao, categoria, preco, professorId } = dados;
    const professor = await Usuario.findByPk(professorId);

    if (!professor) {
      throw new Error('Professor não encontrado');
    }

    const curso = await Curso.create({ nomeCurso, descricao, categoria, preco, professorId });
    return curso;
  }

  static async obterCursos() {
    const cursos = await Curso.findAll();
    return cursos;
  }

  static async obterCursoPorId(id) {
    const curso = await Curso.findByPk(id);
    return curso;
  }

  static async atualizarCurso(id, dados) {
    const { nomeCurso, descricao, categoria, preco, professorId } = dados;
    const curso = await Curso.findByPk(id);

    if (!curso) {
      throw new Error('Curso não encontrado');
    }

    const professor = await Usuario.findByPk(professorId);

    if (!professor) {
      throw new Error('Professor não encontrado');
    }

    curso.nomeCurso = nomeCurso;
    curso.descricao = descricao;
    curso.categoria = categoria;
    curso.preco = preco;
    curso.professorId = professorId;
    await curso.save();

    return curso;
  }

  static async deletarCurso(id) {
    const curso = await Curso.findByPk(id);

    if (!curso) {
      throw new Error('Curso não encontrado');
    }

    await curso.destroy();
    return curso;
  }
}

module.exports = CursoService;
