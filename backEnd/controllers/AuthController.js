const AuthService = require('../services/authServices');

class AuthController {
  static async login(req, res) {
    try {
      const { email, senha } = req.body;
      const { token, usuario } = await AuthService.login(email, senha);
      res.status(200).json({ token, usuario });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async registrar(req, res) {
    try {
      const usuario = await AuthService.registrar(req.body);
      res.status(201).json(usuario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async logout(req, res) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      await AuthService.logout(token);
      res.status(200).json({ message: 'Logout realizado com sucesso' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async recoverPasswordOrUsername(req, res) {
    try {
      const { email } = req.body;
      await AuthService.recoverPasswordOrUsername(email);
      res.status(200).json({ message: 'Um email foi enviado com instruções para recuperação da senha ou nome de usuário.' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async resetPassword(req, res) {
    try {
      const { email, newPassword } = req.body;
      await AuthService.resetPassword(email, newPassword);
      res.status(200).json({ message: 'Senha redefinida com sucesso.' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = AuthController;
