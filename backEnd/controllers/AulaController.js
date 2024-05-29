const aulaService = require('../services/AulaService');

exports.criarAula = async (req, res) => {
  try {
    const novaAula = await aulaService.criarAula(req.body);
    res.status(201).json(novaAula);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obterAulas = async (req, res) => {
  try {
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
    const aula = await aulaService.atualizarAula(req.params.id, req.body);
    res.status(200).json(aula);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletarAula = async (req, res) => {
  try {
    await aulaService.deletarAula(req.params.id);
    res.status(200).json({ message: 'Aula deletada com sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
