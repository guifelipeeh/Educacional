const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
      model: 'Usuarios',
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
  },
  tokenInvalido: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false // Por padrão, o token não está na lista negra
  }
}, {
  timestamps: true,
  paranoid: true
});

module.exports = Sessao;
