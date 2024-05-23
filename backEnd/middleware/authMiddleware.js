// middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');

const validarJwt = (req, res, next) => {
  // Extrair o token do cabeçalho Authorization
  const token = req.headers.authorization;

  // Verificar se o token está presente
  if (!token) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido.' });
  }

  try {
    // Verificar se o token é válido e extrair os dados do usuário
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // Adicionar os dados do usuário ao objeto de solicitação
    next(); // Prosseguir para o próximo middleware
  } catch (error) {
    return res.status(401).json({ message: 'Token de autenticação inválido.' });
  }
};

module.exports = { validarJwt };
