const AulaService = require('../services/aulaService');

exports.criarAula = async (req, res) => {
  try {
    const aula = await AulaService.criarAula(req.body);
    res.status(201).json(aula);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obterAulas = async (req, res) => {
  try {
    const aulas = await AulaService.obterAulas();
    res.status(200).json(aulas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obterAulaPorId = async (req, res) => {
  try {
    const aula = await AulaService.obterAulaPorId(req.params.id);
    if (aula) {
      res.status(200).json(aula);
    } else {
      res.status(404).json({ error: 'Aula não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.atualizarAula = async (req, res) => {
  try {
    const aula = await AulaService.atualizarAula(req.params.id, req.body);
    if (aula) {
      res.status(200).json(aula);
    } else {
      res.status(404).json({ error: 'Aula não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletarAula = async (req, res) => {
  try {
    const aula = await AulaService.deletarAula(req.params.id);
    if (aula) {
      res.status(200).json({ message: 'Aula deletada com sucesso' });
    } else {
      res.status(404).json({ error: 'Aula não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
