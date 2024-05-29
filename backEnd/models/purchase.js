// models/Compra.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Curso = require('./Curso');

const Compra = sequelize.define('Compra', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'id'
    }
  },
  cursoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Curso,
      key: 'id'
    }
  },
  dataCompra: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true,
  paranoid: true
});

// Associações
Usuario.hasMany(Compra, { foreignKey: 'usuarioId' });
Compra.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Curso.hasMany(Compra, { foreignKey: 'cursoId' });
Compra.belongsTo(Curso, { foreignKey: 'cursoId' });

module.exports = Compra;
