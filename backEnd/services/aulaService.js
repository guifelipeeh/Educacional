const Aula = require('../models/Aula');

class AulaService {
  static async criarAula(dados) {
    return await Aula.create(dados);
  }

  static async obterAulas() {
    return await Aula.findAll();
  }

  static async obterAulaPorId(id) {
    return await Aula.findByPk(id);
  }

  static async atualizarAula(id, dados) {
    const aula = await Aula.findByPk(id);
    if (aula) {
      await aula.update(dados);
      return aula;
    }
    return null;
  }

  static async deletarAula(id) {
    const aula = await Aula.findByPk(id);
    if (aula) {
      await aula.destroy();
      return aula;
    }
    return null;
  }
}

module.exports = AulaService;
