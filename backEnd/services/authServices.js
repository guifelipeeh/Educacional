const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const Sessao = require('../models/Sessao');

class AuthService {
  static async registrar(dados) {
    const { senha } = dados;
    const senhaHash = await bcrypt.hash(senha, 10);
    dados.senha = senhaHash;
    return await Usuario.create(dados);
  }

  static async login(email, senha) {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    console.log("encontrei");
    if (!senhaValida) {
      throw new Error('Senha inválida');
    }

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const expiracao = new Date();
    expiracao.setHours(expiracao.getHours() + 1);

    await Sessao.create({ usuarioId: usuario.id, token, expiracao });

    return { token, usuario };
  }

  static async logout(token) {
    const sessao = await Sessao.findOne({ where: { token } });
    if (sessao) {
      await sessao.destroy();
    }
  }
}

module.exports = AuthService;
