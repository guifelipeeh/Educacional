const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const Sessao = require('../models/Sessao');

async function verificarTokenComSessao(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ mensagem: 'Token de autenticação não fornecido.' });
  }

  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensagem: 'Token de autenticação inválido.' });
    }

    const sessao = await Sessao.findOne({ where: { token } });

    if (!sessao) {
      return res.status(401).json({ mensagem: 'Sessão não encontrada para o token fornecido.' });
    }

    // Verifica se a sessão está expirada
    if (sessao.dataExpiracao < new Date()) {
      await sessao.destroy(); // Remove a sessão expirada do banco de dados
      return res.status(401).json({ mensagem: 'Sessão expirada.' });
    }

    req.usuario = decoded.usuario;
    req.sessao = sessao; // Adiciona a sessão ao objeto req para uso posterior nas rotas protegidas
    next();
  });
}

module.exports = verificarTokenComSessao;
