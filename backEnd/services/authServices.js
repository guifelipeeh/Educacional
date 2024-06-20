const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment-timezone');
const Usuario = require('../models/Usuario');
const Sessao = require('../models/Sessao');
const transporter = require('../configNodeMailler/nodemailler');
const MsgHTML = require('../configNodeMailler/mensage');

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

    const sessaoExistente = await Sessao.findOne({ where: { usuarioId: usuario.id, tokenInvalido: false } });

    if (sessaoExistente) {
      throw new Error('Usuário já está logado.');
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      throw new Error('Senha inválida');
    }

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const expiracao = moment().tz('America/Sao_Paulo').add(1, 'hour').toDate();

    await Sessao.create({ usuarioId: usuario.id, token, expiracao });

    return { token, usuario };
  }

  static async logout(token) {
    const sessao = await Sessao.findOne({ where: { token } });
    if (sessao) {
      await sessao.update({ tokenInvalido: true });
    }
  }

  static async recoverPasswordOrUsername(email) {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    const newPassword = AuthService.generateRandomPassword();
    const senhaHash = await bcrypt.hash(newPassword, 10);
    await usuario.update({ senha: senhaHash });

    const mailOptions = {
      from: process.env.EMAIL_USER + "<Educacional APP Ltda>",
      to: email,
      subject: 'Recuperação de Senha',
      text: `Sua nova senha é: ${newPassword}`,
      html: MsgHTML(newPassword)
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        throw new Error('Erro ao enviar o email de recuperação de senha');
      } else {
        console.log('Email enviado: ' + info.response);
      }
    });

    return { message: 'Senha recuperada com sucesso. Verifique seu email para mais detalhes.' };
  }

  static generateRandomPassword() {
    return Math.random().toString(36).slice(-8);
  }

  static async resetPassword(email, newPassword) {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    const senhaHash = await bcrypt.hash(newPassword, 10);
    await usuario.update({ senha: senhaHash });

    return { message: 'Senha redefinida com sucesso.' };
  }
}

module.exports = AuthService;
