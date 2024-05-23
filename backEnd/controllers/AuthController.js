const AuthService = require('../services/authServices');

exports.registrar = async (req, res) => {
  
  try {
    const usuario = await AuthService.registrar(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const { token, usuario } = await AuthService.login(email, senha);
    res.status(200).json({ token, usuario });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    await AuthService.logout(token);
    res.status(200).json({ message: 'Logout realizado com sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
