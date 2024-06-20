const Sessao = require('../models/Sessao');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Usuario = require('../models/Usuario');

dotenv.config();

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido.' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token de autenticação inválido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);

    const sessao = await Sessao.findOne({ where: { token } });

    if (!sessao) {
      return res.status(401).json({ message: 'Token de autenticação inválido ou expirado.' });
    }

    // Verificar se o token está expirado
    if (decoded.exp <= Date.now() / 1000) {
      await sessao.update({ tokenInvalido: true }); // Marcar o token como inválido se estiver expirado
      return res.status(401).json({ message: 'Token de autenticação expirado.' });
    }

    const usuario = await Usuario.findOne({ where: { id: decoded.id } });
    console.log('Usuario:', usuario);

    if (!usuario) {
      return res.status(401).json({ message: 'Usuário não encontrado.' });
    }

    req.usuario = { id: usuario.id, email: usuario.email, tipo: usuario.tipo };
    next();
  } catch (error) {
    console.log('Erro na autenticação:', error);
    return res.status(401).json({ message: 'Token de autenticação inválido.' });
  }
};
