const Avaliacao = require('../models/Avaliacao');

exports.criarAvaliacao = async (req, res) => {
  try {
    const avaliacao = await Avaliacao.create(req.body);
    res.status(201).json(avaliacao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obterAvaliacoes = async (req, res) => {
  try {
    const avaliacoes = await Avaliacao.findAll();
    res.status(200).json(avaliacoes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obterAvaliacaoPorId = async (req, res) => {
  try {
    const avaliacao = await Avaliacao.findByPk(req.params.id);
    if (avaliacao) {
      res.status(200).json(avaliacao);
    } else {
      res.status(404).json({ error: 'Avaliação não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.atualizarAvaliacao = async (req, res) => {
  try {
    const [updated] = await Avaliacao.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedAvaliacao = await Avaliacao.findByPk(req.params.id);
      res.status(200).json(updatedAvaliacao);
    } else {
      res.status(404).json({ error: 'Avaliação não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletarAvaliacao = async (req, res) => {
  try {
    const deleted = await Avaliacao.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(200).json({ message: 'Avaliação deletada com sucesso' });
    } else {
      res.status(404).json({ error: 'Avaliação não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
