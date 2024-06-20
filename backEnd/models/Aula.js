const { DataTypes } = require('sequelize');
const sequelize = require('../configurations/DataBaseConfig');

const Aula = sequelize.define('Aula', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  urlVideo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cursoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Curso',  // Use o nome do modelo como string
      key: 'id'
    }
  }
}, {
  timestamps: true,
  paranoid: true
});

module.exports = Aula;
