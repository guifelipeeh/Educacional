const Avaliacao = require('../models/Avaliacao');

class AvaliacaoService {
  static async criarAvaliacao(dados) {
    return await Avaliacao.create(dados);
  }

  static async obterAvaliacoes() {
    return await Avaliacao.findAll();
  }

  static async obterAvaliacaoPorId(id) {
    return await Avaliacao.findByPk(id);
  }

  static async atualizarAvaliacao(id, dados) {
    const avaliacao = await Avaliacao.findByPk(id);
    if (avaliacao) {
      await avaliacao.update(dados);
      return avaliacao;
    }
    return null;
  }

  static async deletarAvaliacao(id) {
    const avaliacao = await Avaliacao.findByPk(id);
    if (avaliacao) {
      await avaliacao.destroy();
      return avaliacao;
    }
    return null;
  }
}

module.exports = AvaliacaoService;
