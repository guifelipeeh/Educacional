const Compra = require('../models/Compra');

class CompraService {
  static async criarCompra(dados) {
    return await Compra.create(dados);
  }

  static async obterCompras() {
    return await Compra.findAll();
  }

  static async obterCompraPorId(id) {
    return await Compra.findByPk(id);
  }

  static async atualizarCompra(id, dados) {
    const compra = await Compra.findByPk(id);
    if (compra) {
      await compra.update(dados);
      return compra;
    }
    return null;
  }

  static async deletarCompra(id) {
    const compra = await Compra.findByPk(id);
    if (compra) {
      await compra.destroy();
      return compra;
    }
    return null;
  }
}

module.exports = CompraService;
