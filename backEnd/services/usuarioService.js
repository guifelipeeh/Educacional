// services/usuarioService.js

const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UsuarioService {
  async cadastrarUsuario(dadosUsuario) {
    const senhaCriptografada = await bcrypt.hash(dadosUsuario.senha, 10);
    const usuario = await Usuario.create({ ...dadosUsuario, senha: senhaCriptografada });
    return usuario;
  }

  async loginUsuario(email, senha) {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      throw new Error('Usuário não encontrado.');
    }
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      throw new Error('Credenciais inválidas.');
    }
    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
  }

  async obterUsuarioPorId(id) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      throw new Error('Usuário não encontrado.');
    }
    return usuario;
  }

  async atualizarUsuario(id, novosDadosUsuario) {
    await Usuario.update(novosDadosUsuario, { where: { id } });
    const usuarioAtualizado = await Usuario.findByPk(id);
    return usuarioAtualizado;
  }

  async deletarUsuario(id) {
    await Usuario.destroy({ where: { id } });
  }
}

module.exports = new UsuarioService();
