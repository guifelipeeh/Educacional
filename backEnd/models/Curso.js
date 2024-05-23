const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');

const Curso = sequelize.define('Curso', {
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
  professorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'id'
    }
  }
}, {
  timestamps: true,
  paranoid: true
});

Usuario.hasMany(Curso, { foreignKey: 'professorId' });
Curso.belongsTo(Usuario, { foreignKey: 'professorId' });

module.exports = Curso;
