'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Cursos', 'preco', {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0.0 // Valor padrão para cursos existentes
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Cursos', 'preco');
  }
};

