// middlewares/validateCadastro.js

const validateCadastro = (req, res, next) => {
    const { nome, email, senha, tipo } = req.body;
  
    // Verificar se todos os campos obrigatórios estão presentes
    if (!nome || !email || !senha || !tipo) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
  
    // Adicione qualquer validação adicional necessária aqui
  
    next(); // Prosseguir para o próximo middleware
  };
  
  module.exports = validateCadastro;
  