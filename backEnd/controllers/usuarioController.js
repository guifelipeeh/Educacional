const usuarioService = require('../services/usuarioService');
const { Sessao, Curso, Aula } = require('../models/associations');
const sequelize = require('../configurations/DataBaseConfig');

exports.cadastrarUsuario = async (req, res) => {
  try {
    const usuario = await usuarioService.cadastrarUsuario(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.loginUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const token = await usuarioService.loginUsuario(email, senha);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

exports.obterPerfilUsuario = async (req, res) => {
  try {
    const usuario = await usuarioService.obterUsuarioPorId(req.usuario.id);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.atualizarPerfilUsuario = async (req, res) => {
  try {
    const usuario = await usuarioService.atualizarUsuario(req.usuario.id, req.body);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletarPerfilUsuario = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const userId = req.usuario.id;

    // Delete todas as sessões associadas ao usuário
    await Sessao.destroy({ where: { usuarioId: userId }, transaction });

    // Encontre todos os cursos associados ao usuário
    const cursos = await Curso.findAll({ where: { professorId: userId }, transaction });

    // Delete todas as aulas associadas aos cursos do usuário
    for (const curso of cursos) {
      await Aula.destroy({ where: { cursoId: curso.id }, transaction });
    }

    // Delete todos os cursos associados ao usuário
    await Curso.destroy({ where: { professorId: userId }, transaction });

    // Delete o usuário
    await usuarioService.deletarUsuario(userId, transaction);

    await transaction.commit();
    res.status(204).json();
  } catch (error) {
    await transaction.rollback();
    res.status(400).json({ error: error.message });
  }
};
