aulaService = require("../services/aulaService");

exports.criarAula = async (req, res) => {
  try {
    if (req.usuario.tipo !== 'professor' && req.usuario.tipo !== 'admin') {
      return res.status(403).json({ error: 'Apenas professores e administradores podem criar aulas' });
    }
    const novaAula = await aulaService.criarAula(req.body);
    res.status(201).json(novaAula);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obterAulas = async (req, res) => {
  try {
    if (req.usuario.tipo !== 'professor' && req.usuario.tipo !== 'admin') {
      return res.status(403).json({ error: 'Apenas professores e administradores podem acessar todas as aulas' });
    }
    const aulas = await aulaService.obterTodasAulas();
    res.status(200).json(aulas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obterAulaPorId = async (req, res) => {
  try {
    const aula = await aulaService.obterAulaPorId(req.params.id);
    res.status(200).json(aula);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.atualizarAula = async (req, res) => {
  try {
    if (req.usuario.tipo !== 'professor' && req.usuario.tipo !== 'admin') {
      return res.status(403).json({ error: 'Apenas professores e administradores podem atualizar aulas' });
    }
    const aula = await aulaService.atualizarAula(req.params.id, req.body);
    res.status(200).json(aula);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletarAula = async (req, res) => {
  try {
    if (req.usuario.tipo !== 'professor' && req.usuario.tipo !== 'admin') {
      return res.status(403).json({ error: 'Apenas professores e administradores podem deletar aulas' });
    }
    await aulaService.deletarAula(req.params.id);
    res.status(200).json({ message: 'Aula deletada com sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
