const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');

const Sessao = sequelize.define('Sessao', {
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
  token: {
    type: DataTypes.STRING,
    allowNull: false
  },
  expiracao: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  timestamps: true,
  paranoid: true
});

Usuario.hasMany(Sessao, { foreignKey: 'usuarioId' });
Sessao.belongsTo(Usuario, { foreignKey: 'usuarioId' });

module.exports = Sessao;
