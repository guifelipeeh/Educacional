const Sessao = require('../models/Sessao');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

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

    const sessao = await Sessao.findOne({ where: { token } });

    if (!sessao) {
      return res.status(401).json({ message: 'Token de autenticação inválido ou expirado.' });
    }

    req.user = { id: decoded.id, email: decoded.email }; // ou qualquer outra informação necessária
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token de autenticação inválido.' });
  }
};
