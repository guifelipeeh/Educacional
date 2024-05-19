const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

function verificarToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ mensagem: 'Token de autenticação não fornecido.' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensagem: 'Token de autenticação inválido.' });
    }

    req.usuario = decoded.usuario;
    next();
  });
}

module.exports = verificarToken;
