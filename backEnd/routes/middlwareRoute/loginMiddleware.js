function tratarLogin(req, res, next) {
    const { email, senha } = req.body;
  
    // Verifica se todos os campos obrigatórios foram fornecidos
    if (!email || !senha) {
      return res.status(400).json({ mensagem: 'Email e senha são obrigatórios.' });
    }
  
    // Passou na validação, pode prosseguir para o próximo middleware
    next();
  }
  
  module.exports = tratarLogin;
  