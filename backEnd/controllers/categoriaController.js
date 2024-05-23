const Categoria = require('../models/Categoria');

exports.criarCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.create(req.body);
    res.status(201).json(categoria);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obterCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obterCategoriaPorId = async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (categoria) {
      res.status(200).json(categoria);
    } else {
      res.status(404).json({ error: 'Categoria não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.atualizarCategoria = async (req, res) => {
  try {
    const [updated] = await Categoria.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedCategoria = await Categoria.findByPk(req.params.id);
      res.status(200).json(updatedCategoria);
    } else {
      res.status(404).json({ error: 'Categoria não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletarCategoria = async (req, res) => {
  try {
    const deleted = await Categoria.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(200).json({ message: 'Categoria deletada com sucesso' });
    } else {
      res.status(404).json({ error: 'Categoria não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
