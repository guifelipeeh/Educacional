function protegerRotaAutenticada(req, res, next) {
    if (!req.usuario) {
      return res.status(403).json({ mensagem: 'Acesso não autorizado. Token de autenticação não encontrado.' });
    }
  
    // Se chegou até aqui, o token é válido e o usuário está autenticado
    next();
  }
  
  module.exports = protegerRotaAutenticada;
  