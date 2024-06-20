function tratarCadastro(req, res, next) {
    const { nome, email, senha } = req.body;
  
    // Verifica se todos os campos obrigatórios foram fornecidos
    if (!nome || !email || !senha) {
      return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios: nome, email e senha.' });
    }
  
    // Verifica se o formato do email é válido
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ mensagem: 'Formato de email inválido.' });
    }
  
    // Passou na validação, pode prosseguir para o próximo middleware
    next();
  }
  
  module.exports = tratarCadastro;
  