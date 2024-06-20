const { Sessao, Usuario } = require('../models/associations');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.cadastrarUsuario = async (usuarioData) => {
  const hash = await bcrypt.hash(usuarioData.senha, 10);
  const usuario = await Usuario.create({ ...usuarioData, senha: hash });
  return usuario;
};

exports.loginUsuario = async (email, senha) => {
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) {
    throw new Error('Usuário não encontrado');
  }

  const isPasswordValid = await bcrypt.compare(senha, usuario.senha);
  if (!isPasswordValid) {
    throw new Error('Senha incorreta');
  }

  const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  const expiracao = new Date();
  expiracao.setHours(expiracao.getHours() + 1); // Define a expiração para 1 hora no futuro

  await Sessao.create({
    token,
    expiracao,
    usuarioId: usuario.id
  });

  return token;
};

exports.obterUsuarioPorId = async (id) => {
  return await Usuario.findByPk(id);
};

exports.atualizarUsuario = async (id, usuarioData) => {
  await Usuario.update(usuarioData, { where: { id } });
  return await Usuario.findByPk(id);
};

exports.deletarUsuario = async (id, transaction = null) => {
  await Usuario.destroy({ where: { id }, transaction });
};
