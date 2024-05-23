const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Curso = require('./Curso');

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
      model: Curso,
      key: 'id'
    }
  }
}, {
  timestamps: true,
  paranoid: true
});

Curso.hasMany(Aula, { foreignKey: 'cursoId' });
Aula.belongsTo(Curso, { foreignKey: 'cursoId' });

module.exports = Aula;
