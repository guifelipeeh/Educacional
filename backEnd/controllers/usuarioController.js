// controllers/usuarioController.js

const usuarioService = require('../services/usuarioService');

exports.cadastrarUsuario = async (req, res) => {
  try {
    const usuario = await usuarioService.cadastrarUsuario(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.loginUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const token = await usuarioService.loginUsuario(email, senha);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

exports.obterPerfilUsuario = async (req, res) => {
  try {
    const usuario = await usuarioService.obterUsuarioPorId(req.usuario.id);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.atualizarPerfilUsuario = async (req, res) => {
  try {
    const usuario = await usuarioService.atualizarUsuario(req.usuario.id, req.body);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletarPerfilUsuario = async (req, res) => {
  try {
    await usuarioService.deletarUsuario(req.usuario.id);
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
