const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const Sessao = require('../models/Sessao');
const nodemailer = require('../config/nodemailler'); // Importando o módulo nodemailer configurado

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
      await sessao.update({ tokenInvalido: true });
    }
  }
  static async recoverPasswordOrUsername(email) {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    const newPassword = generateRandomPassword(); // Gerar senha aleatória
    const senhaHash = await bcrypt.hash(newPassword, 10); // Criptografar a senha

    await usuario.update({ senha: senhaHash }); // Atualizar a senha do usuário

    // Enviar um email com a nova senha para o usuário
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Recuperação de Senha',
      text: `Sua nova senha é: ${newPassword}`,
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        throw new Error('Erro ao enviar o email de recuperação de senha');
      } else {
        console.log('Email enviado: ' + info.response);
      }
    });

    return { message: 'Senha recuperada com sucesso. Verifique seu email para mais detalhes.' };
  }

  static generateRandomPassword(length = 12) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }
} 

module.exports = AuthService;
