const Categoria = require('../models/Categoria');

class CategoriaService {
  static async criarCategoria(dados) {
    return await Categoria.create(dados);
  }

  static async obterCategorias() {
    return await Categoria.findAll();
  }

  static async obterCategoriaPorId(id) {
    return await Categoria.findByPk(id);
  }

  static async atualizarCategoria(id, dados) {
    const categoria = await Categoria.findByPk(id);
    if (categoria) {
      await categoria.update(dados);
      return categoria;
    }
    return null;
  }

  static async deletarCategoria(id) {
    const categoria = await Categoria.findByPk(id);
    if (categoria) {
      await categoria.destroy();
      return categoria;
    }
    return null;
  }
}

module.exports = CategoriaService;
